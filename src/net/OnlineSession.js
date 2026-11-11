// OnlineSession — оркестрация онлайн-режима.
// Хост = рефери (единственный писатель состояния); остальные телефоны —
// тонкие клиенты: шлют CLIENT_ACTION и рендерят STATE_SYNC-снапшоты.
// Игровая логика и рендер живут в main.js — сюда они приходят коллбеками (deps).

import { NetworkManager, getOrCreatePlayerId, saveSession, loadSession, clearSession } from './NetworkManager.js';

// Операции, меняющие состояние: выполняются только на хосте.
export const OPS = new Set([
  'START_GAME', 'SUBMIT_PICK', 'EDIT_QUESTION', 'SUBMIT_WORDS',
  'SUBMIT_SECRET_CHOICE', 'BUY_HINT', 'MAKE_GUESS', 'ACK_RESULT',
  'TRIGGER_SAFETY', 'RESUME_MATCH', 'PLAY_AGAIN', 'ORAL_HINT_DONE'
]);

// Эфемерные UI-события: релей всем клиентам, без записи в каноническое состояние.
export const EPHEMERAL = new Set([
  'TYPING_PROGRESS', 'CAROUSEL_SWIPE', 'SET_LOCALE'
]);

export class OnlineSession {
  /**
   * deps (провайдер из main.js):
   *  store                    — GameStateStore
   *  applyAction(action)      — выполнить op (соло или хост)
   *  renderLocalView()        — ролевой рендер текущего состояния
   *  restoreRuntimeFromState(state) — пересобрать game/shifter-зеркала из снапшота
   *  renderEphemeral(action, fromPlayerId)
   *  onLobbyUpdate(players)   — ростер комнаты изменился
   *  onConnectionChange(status) — 'connecting' | 'open' | 'closed'
   *  onHostPresence(present)  — хост ушёл/вернулся (для баннера у гостей)
   *  onRoomEntered({roomCode,isHost,players,resumed}) — успешный create/join
   *  onSessionEnd(reason)     — ROOM_CLOSED / выход — сброс в setup;
   *                            reason: 'expired' | 'host_left' | 'host_gone'
   *  onSessionError({code,message,claimable}) — ERROR от сервера;
   *                            claimable — offline-места для reclaim'а
   *  hasActiveMatch()         — есть ли живой runtime матча (для гарда от
   *                            затирания состояния хоста стейл-снапшотом)
   */
  constructor(deps) {
    this.deps = deps;
    this.ctx = {
      mode: 'solo',
      isHost: false,
      myPlayerId: getOrCreatePlayerId(),
      roomCode: null
    };
    this.net = new NetworkManager();
    this.net.onMessage(msg => this._route(msg));
    this.net.onStatus(status => this._onStatus(status));
  }

  isOnline() { return this.ctx.mode === 'online'; }
  isHost() { return this.ctx.isHost; }
  myPlayerId() { return this.ctx.myPlayerId; }

  // --- Публичные операции лобби ---

  createRoom({ name, avatar, avatarAuto }) {
    this._pendingIntent = { kind: 'create', name, avatar, avatarAuto };
    this._ensureConnected();
  }

  joinRoom(roomCode, { name, avatar, avatarAuto }) {
    this._pendingIntent = { kind: 'join', roomCode: String(roomCode).toUpperCase().trim(), name, avatar, avatarAuto };
    this._ensureConnected();
  }

  _ensureConnected() {
    if (this.net.isOpen()) {
      this._sendIntent();
    } else {
      this.net.connect();
    }
  }

  _sendIntent() {
    const intent = this._pendingIntent;
    if (!intent) return;
    // avatarAuto: сервер разруливает дубли только авто-дефолтам;
    // ручной выбор юзера может осознанно совпадать — не трогаем.
    const base = {
      playerId: this.ctx.myPlayerId,
      name: intent.name,
      avatar: intent.avatar,
      avatarAuto: !!intent.avatarAuto
    };
    if (intent.kind === 'create') {
      this.net.send({ type: 'CREATE_ROOM', ...base });
    } else {
      this.net.send({ type: 'JOIN_ROOM', roomCode: intent.roomCode, ...base });
    }
  }

  leaveRoom() {
    try {
      if (this.net.isOpen() && this.ctx.roomCode) {
        this.net.send({ type: 'LEAVE_ROOM', roomCode: this.ctx.roomCode, playerId: this.ctx.myPlayerId });
      }
    } catch (e) {}
    clearSession();
    this.ctx.mode = 'solo';
    this.ctx.isHost = false;
    this.ctx.roomCode = null;
    this._pendingIntent = null;
    this.net.close();
  }

  // --- Диспетчер игровых действий (единая точка для UI) ---

  dispatchAction(action) {
    if (!action || !action.type) return;
    if (EPHEMERAL.has(action.type)) {
      this.sendEphemeral(action);
      return;
    }
    if (!this.isOnline()) {
      this.deps.applyAction(action);
      return;
    }
    if (this.ctx.isHost) {
      this.deps.applyAction(action);
      this.broadcastState();
    } else {
      this.net.send({ type: 'CLIENT_ACTION', roomCode: this.ctx.roomCode, action });
    }
  }

  sendEphemeral(action) {
    if (this.isOnline()) {
      this.net.send({ type: 'CLIENT_ACTION', roomCode: this.ctx.roomCode, action });
    } else {
      this.deps.renderEphemeral(action, this.ctx.myPlayerId);
    }
  }

  broadcastState() {
    if (!this.isOnline() || !this.ctx.isHost) return;
    // SAFETY_PAUSE — локальный оверлей хоста, не должен утекать гостям.
    const snapshot = JSON.parse(this.deps.store.toJSON());
    if (snapshot.phase === 'SAFETY_PAUSE') snapshot.phase = snapshot.prevPhase || 'SETUP';
    this.net.send({ type: 'STATE_SYNC', roomCode: this.ctx.roomCode, state: snapshot });
  }

  // Тихое переподключение к комнате после обновления страницы.
  // Возвращает {roomCode, name, avatar, savedAt} если релеевантная сессия есть.
  // Сессии старше ~6ч не имеет смысла будить — комната гарантированно мертва
  // по TTL (2ч неактивности), так что сразу чистим.
  getResumeInfo() {
    const s = loadSession();
    if (!s.roomCode || !s.playerId) return null;
    // Чистку делаем только вне активной комнаты — иначе при >6ч матче
    // посреди игры потерли бы свою же рабочую сессию.
    if (!this.isOnline() && s.savedAt && Date.now() - s.savedAt > 6 * 60 * 60 * 1000) {
      clearSession();
      return null;
    }
    return s;
  }

  resume() {
    const s = this.getResumeInfo();
    if (!s) return false;
    // Сохранённый аватар — уже решённый сервером → avatarAuto: false.
    this._pendingIntent = { kind: 'join', roomCode: s.roomCode, name: s.name || 'PLAYER', avatar: s.avatar || '🎮', avatarAuto: false };
    this._ensureConnected();
    return true;
  }

  // Reclaim своего места после полной потери хранилища: сервер в
  // GAME_IN_PROGRESS отдаёт claimable-список offline-мест — входим под
  // старым playerId этого места, дальше штатный rejoin-путь.
  claimSeat(roomCode, seat) {
    if (!roomCode || !seat || !seat.playerId) return false;
    this.ctx.myPlayerId = seat.playerId;
    this._pendingIntent = {
      kind: 'join',
      roomCode: String(roomCode).toUpperCase().trim(),
      name: seat.name || 'PLAYER',
      avatar: seat.avatar || '🎮',
      avatarAuto: false
    };
    this._ensureConnected();
    return true;
  }

  // --- Внутреннее ---

  _onStatus(status) {
    this.deps.onConnectionChange(status);
    if (status === 'open') {
      // Если сокет умер и поднялся заново — шлём интент повторно
      // (CREATE/JOIN). Сервер вернёт ROOM_* с кэшированным state.
      if (this._pendingIntent) this._sendIntent();
      else if (this.ctx.roomCode) {
        const s = loadSession();
        this.net.send({
          type: 'JOIN_ROOM',
          roomCode: this.ctx.roomCode,
          playerId: this.ctx.myPlayerId,
          name: s.name || 'PLAYER',
          avatar: s.avatar || '🎮'
        });
      }
    }
  }

  _route(msg) {
    // Комнатный трафик вне комнаты игнорируем: после своего leaveRoom() свой
    // ещё не закрывшийся сокет может получить broadcast ROOM_CLOSED и
    // показать фантомный «комната закрыта» алерт самому вышедшему.
    const ROOM_SCOPED = ['LOBBY_UPDATE', 'PLAYER_LEFT', 'STATE_SYNC', 'CLIENT_ACTION', 'HOST_LEFT', 'HOST_BACK', 'ROOM_CLOSED'];
    if (ROOM_SCOPED.includes(msg.type) && !this.isOnline()) return;

    switch (msg.type) {
      case 'PONG':
        return;

      case 'ROOM_CREATED':
      case 'ROOM_JOINED':
        this._onJoined(msg);
        return;

      case 'LOBBY_UPDATE':
      case 'PLAYER_LEFT':
        this.deps.onLobbyUpdate(msg.players || []);
        return;

      case 'STATE_SYNC':
        this.deps.restoreRuntimeFromState(msg.state);
        this.deps.renderLocalView();
        return;

      case 'CLIENT_ACTION':
        this._onClientAction(msg);
        return;

      case 'HOST_LEFT':
        this.deps.onHostPresence(false);
        return;

      case 'HOST_BACK':
        this.deps.onHostPresence(true);
        // Хост вернулся: после его реконнекта он получит свой же
        // кэшированный снапшот и разошлёт свежий STATE_SYNC при
        // ближайшем действии — тут просто прячем баннер.
        return;

      case 'ROOM_CLOSED':
        this._teardown();
        this.deps.onSessionEnd(msg.reason || 'closed');
        return;

      case 'ERROR': {
        // Код комнаты из неудавшегося интента — нужен для claimSeat.
        const triedCode = (this._pendingIntent && this._pendingIntent.roomCode) || this.ctx.roomCode || null;
        // ERROR терминальная для интента: не сбрасывая его, каждый реконнект
        // сокета перешлёпнул бы JOIN и спамил ошибкой.
        this._pendingIntent = null;
        this.deps.onSessionError({
          code: msg.code,
          message: msg.message,
          claimable: msg.claimable,
          roomCode: triedCode
        });
        return;
      }
    }
  }

  _onJoined(msg) {
    const resumed = !!msg.state;
    this.ctx.mode = 'online';
    this.ctx.isHost = !!msg.isHost;
    this.ctx.roomCode = msg.roomCode;
    const s = this._pendingIntent || {};
    // В сессию — аватар, РЕШЁННЫЙ сервером (при дубле авто-дефолт меняется):
    // реконнект не должен заново слать старое занятое значение.
    const selfEntry = (msg.players || []).find(p => p.playerId === this.ctx.myPlayerId);
    saveSession({
      playerId: this.ctx.myPlayerId,
      roomCode: msg.roomCode,
      name: s.name,
      avatar: (selfEntry && selfEntry.avatar) || s.avatar
    });
    this._pendingIntent = null;
    this.deps.onLobbyUpdate(msg.players || []);
    this.deps.onRoomEntered({
      roomCode: msg.roomCode,
      isHost: this.ctx.isHost,
      players: msg.players || [],
      resumed
    });
    if (resumed) {
      // Хост — писатель состояния: если его локальный матч жив (socket-blip
      // без перезагрузки страницы), кэшированный снапшот не новее его стора —
      // не затираем. Restore нужен хосту только после reload (runtime пуст).
      const keepLocal = this.ctx.isHost && this.deps.hasActiveMatch && this.deps.hasActiveMatch();
      if (!keepLocal) this.deps.restoreRuntimeFromState(msg.state);
      this.deps.renderLocalView();
      // Вернувшийся хост сразу делится актуальным состоянием с остальными.
      if (this.ctx.isHost) this.broadcastState();
    }
  }

  _onClientAction(msg) {
    const action = msg.action;
    if (!action || !action.type) return;
    if (EPHEMERAL.has(action.type)) {
      this.deps.renderEphemeral(action, msg.from);
      return;
    }
    if (this.ctx.isHost && OPS.has(action.type)) {
      this.deps.applyAction(action, msg.from);
      this.broadcastState();
    }
  }

  _teardown() {
    clearSession();
    this.ctx.mode = 'solo';
    this.ctx.isHost = false;
    this.ctx.roomCode = null;
  }
}
