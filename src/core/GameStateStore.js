// GameStateStore — единое сериализуемое состояние матча и раунда.
// Вся game-логика по-прежнему живёт в main.js / Match / WordShifter,
// а стор держит plain-data снимок, который можно отдать по сети (Sprint 3).

export const GamePhase = Object.freeze({
  SETUP: 'SETUP',
  LOBBY: 'LOBBY',
  PASS_DEVICE: 'PASS_DEVICE',
  PICKING: 'PICKING',
  RESPONDING_WORDS: 'RESPONDING_WORDS',
  RESPONDING_CHOICE: 'RESPONDING_CHOICE',
  GUESSING: 'GUESSING',
  ROUND_RESULT: 'ROUND_RESULT',
  SAFETY_PAUSE: 'SAFETY_PAUSE',
  FINAL_SCORES: 'FINAL_SCORES'
});

export class GameStateStore {
  constructor() {
    this.state = GameStateStore.initialState();
    this._listeners = new Set();
  }

  static initialState() {
    return {
      version: 1,
      phase: GamePhase.SETUP,
      prevPhase: null,
      lobby: {
        players: [],
        roundsInput: 1,
        locale: 'en'
      },
      online: {
        roomCode: null,
        hostPlayerId: null,
        roster: [] // {playerId, name, avatar, isHost, connected}
      },
      match: null,
      picker: {
        generatedQuestions: [],
        viewIndex: 0,
        promptHistory: [],
        promptHistoryIndex: 0,
        questionRequiresPlural: false,
        isCustomHintActive: false,
        currentFragmentsState: [],
        currentQuestion: null
      },
      hint: {
        html: '',
        object: null,
        requiresPlural: false
      },
      responder: {
        words: { w1: '', w2: '', finalW1: '', finalW2: '' },
        choice: '',
        unchosen: '',
        // Локаль-осведомлённый модификатор слова из morphology.js:
        // suffix: {kind:'suffix', type:'ism'|'land'|..., tail1, tail2}
        // wrapper: {kind:'wrapper', type:'republic'|..., before, after}
        // или null.
        wordMod: null
      },
      guess: {
        mask: null,
        remainingGuessers: [],
        totalGuessersThisRound: 0,
        currentGuesserIndex: null,
        revealCount: 0,
        oralHintUsed: false,
        roundScoresSnapshot: null
      },
      // Эфемерные live-данные: дублируются ещё и лёгкими relay-сообщениями,
      // а здесь лежат чтобы переподключившийся клиент сразу видел актуальное.
      live: {
        typing: { w1: 0, w2: 0 },
        pickerViewIndex: 0,
        oralHint: null,      // {guesserIdx, ts} — респондеру показать баннер
        lastReveal: null,    // {kind, ts} — триггер reveal-анимации на всех телефонах
        notice: null         // {icon, text, ts} — транзитное уведомление всем телефонам
      },
      roundResult: null, // {nonce, icon, isCorrect, goldBefore, goldAfter, word, sentenceHtml, sceneHtml, sfx}
      safety: {
        talkOpen: false
      }
    };
  }

  getState() {
    return this.state;
  }

  setState(patch) {
    Object.assign(this.state, patch);
    this._notify(patch);
  }

  setPhase(phase, patch = {}) {
    this.setState({ prevPhase: this.state.phase, phase, ...patch });
  }

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  // Мутируем state на месте, чтобы внешние ссылки на store.state оставались валидными
  _replaceStateInPlace(next) {
    Object.keys(this.state).forEach(key => delete this.state[key]);
    Object.assign(this.state, next);
  }

  _notify(patch) {
    this._listeners.forEach(fn => {
      try {
        fn(this.state, patch);
      } catch (err) {
        console.error('GameStateStore listener error:', err);
      }
    });
  }

  reset() {
    const lobby = this.state.lobby;
    const online = this.state.online;
    const fresh = GameStateStore.initialState();
    fresh.lobby = lobby;
    fresh.online = online;
    this._replaceStateInPlace(fresh);
    this._notify({});
  }

  // Атомарно заменяем состояние снапшотом от хоста (мутируем на месте,
  // чтобы внешние ссылки на store.state оставались валидными).
  applyRemoteState(next) {
    this._replaceStateInPlace({ ...GameStateStore.initialState(), ...next });
    this._notify({});
  }

  toJSON() {
    return JSON.stringify(this.state);
  }

  static fromJSON(json) {
    const store = new GameStateStore();
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    store._replaceStateInPlace({ ...GameStateStore.initialState(), ...parsed });
    return store;
  }
}
