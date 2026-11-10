// NetworkManager — транспортный слой онлайн-режима.
// Только WebSocket + переподключение + heartbeat + сессия игрока.
// Игровой смысл сообщений разбирает OnlineSession.

import { DEFAULT_WS_URL, HTTP_SERVER_URL } from '../core/GameConfig.js';

const SESSION_KEYS = {
  playerId: 'rp.playerId',
  roomCode: 'rp.roomCode',
  name: 'rp.name',
  avatar: 'rp.avatar',
  savedAt: 'rp.savedAt'
};

// localStorage, а не sessionStorage: сессия должна переживать убийство
// вкладки/браузера (свайп-закрытие на телефоне) — иначе rejoin невозможен.
// Старые значения из sessionStorage мигрируем при первом чтении.
function storageGet(key) {
  try {
    const v = localStorage.getItem(key);
    if (v !== null) return v;
  } catch (e) {}
  try {
    const v = sessionStorage.getItem(key);
    if (v !== null) {
      try { localStorage.setItem(key, v); } catch (e) {}
      try { sessionStorage.removeItem(key); } catch (e) {}
      return v;
    }
  } catch (e) {}
  return null;
}

function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

function storageRemove(key) {
  try { localStorage.removeItem(key); } catch (e) {}
  try { sessionStorage.removeItem(key); } catch (e) {}
}

export function getOrCreatePlayerId() {
  let id = storageGet(SESSION_KEYS.playerId);
  if (!id) {
    id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2);
    storageSet(SESSION_KEYS.playerId, id);
  }
  return id;
}

export function saveSession(partial) {
  try {
    if (partial.playerId) storageSet(SESSION_KEYS.playerId, partial.playerId);
    if (partial.roomCode) storageSet(SESSION_KEYS.roomCode, partial.roomCode);
    if (partial.name) storageSet(SESSION_KEYS.name, partial.name);
    if (partial.avatar) storageSet(SESSION_KEYS.avatar, partial.avatar);
    storageSet(SESSION_KEYS.savedAt, String(Date.now()));
  } catch (e) {}
}

export function loadSession() {
  try {
    return {
      playerId: storageGet(SESSION_KEYS.playerId),
      roomCode: storageGet(SESSION_KEYS.roomCode),
      name: storageGet(SESSION_KEYS.name),
      avatar: storageGet(SESSION_KEYS.avatar),
      savedAt: parseInt(storageGet(SESSION_KEYS.savedAt), 10) || 0
    };
  } catch (e) {
    return { playerId: null, roomCode: null, name: null, avatar: null, savedAt: 0 };
  }
}

export function clearSession() {
  storageRemove(SESSION_KEYS.roomCode);
  storageRemove(SESSION_KEYS.name);
  storageRemove(SESSION_KEYS.avatar);
  storageRemove(SESSION_KEYS.savedAt);
}

// Тихий пинг /health при загрузке страницы — будим спящий Render free tier,
// пока пользователь ещё вводит имя на #setup-screen.
export function pingServerHealth() {
  try {
    fetch(HTTP_SERVER_URL + '/health', { mode: 'cors', cache: 'no-store' }).catch(() => {});
  } catch (e) {}
}

let wakeLockSentinel = null;

export async function acquireWakeLock() {
  try {
    if (!('wakeLock' in navigator)) return;
    if (wakeLockSentinel) return;
    wakeLockSentinel = await navigator.wakeLock.request('screen');
    wakeLockSentinel.addEventListener('release', () => { wakeLockSentinel = null; });
  } catch (e) {}
}

export function releaseWakeLock() {
  try { if (wakeLockSentinel) wakeLockSentinel.release(); } catch (e) {}
  wakeLockSentinel = null;
}

export class NetworkManager {
  constructor() {
    this.ws = null;
    this.url = DEFAULT_WS_URL;
    this._messageHandlers = new Set();
    this._statusHandlers = new Set();
    this._sendQueue = [];
    this._reconnectDelay = 1000;
    this._reconnectTimer = null;
    this._heartbeatTimer = null;
    this._manualClose = false;
    this._openedOnce = false;

    // iOS Safari убивает сокет при блокировке экрана — при возврате сразу
    // пытаемся переподключиться, не дожидаясь backoff-таймера. visibilitychange
    // — основной сигнал; focus/pageshow/online — страховка на случай, когда
    // браузер не прислал visibilitychange (iOS quirks, возврат сети).
    const tryFastReconnect = () => {
      if (document.hidden) return;
      if (!this._openedOnce || this._manualClose) return;
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this._clearReconnectTimer();
        this._open();
      }
    };
    document.addEventListener('visibilitychange', tryFastReconnect);
    window.addEventListener('focus', tryFastReconnect);
    window.addEventListener('pageshow', tryFastReconnect);
    window.addEventListener('online', tryFastReconnect);
  }

  onMessage(cb) { this._messageHandlers.add(cb); return () => this._messageHandlers.delete(cb); }
  onStatus(cb) { this._statusHandlers.add(cb); return () => this._statusHandlers.delete(cb); }

  _emitMessage(msg) { this._messageHandlers.forEach(cb => { try { cb(msg); } catch (e) { console.error(e); } }); }
  _emitStatus(status) { this._statusHandlers.forEach(cb => { try { cb(status); } catch (e) { console.error(e); } }); }

  isOpen() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  connect(url) {
    if (url) this.url = url;
    this._manualClose = false;
    this._open();
  }

  _open() {
    this._clearReconnectTimer();
    if (this.ws) {
      try { this.ws.onclose = null; this.ws.close(); } catch (e) {}
      this.ws = null;
    }
    this._emitStatus('connecting');
    let ws;
    try {
      ws = new WebSocket(this.url);
    } catch (e) {
      this._scheduleReconnect();
      return;
    }
    this.ws = ws;

    ws.onopen = () => {
      this._reconnectDelay = 1000;
      this._openedOnce = true;
      this._emitStatus('open');
      this._startHeartbeat();
      const queued = this._sendQueue.splice(0);
      queued.forEach(data => this.send(data));
    };

    ws.onmessage = (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }
      this._emitMessage(msg);
    };

    ws.onclose = () => {
      this._stopHeartbeat();
      this._emitStatus('closed');
      if (!this._manualClose) this._scheduleReconnect();
    };

    ws.onerror = () => {
      try { ws.close(); } catch (e) {}
    };
  }

  _scheduleReconnect() {
    this._clearReconnectTimer();
    const delay = this._reconnectDelay;
    this._reconnectDelay = Math.min(this._reconnectDelay * 2, 10000);
    this._reconnectTimer = setTimeout(() => this._open(), delay);
  }

  _clearReconnectTimer() {
    if (this._reconnectTimer) { clearTimeout(this._reconnectTimer); this._reconnectTimer = null; }
  }

  _startHeartbeat() {
    this._stopHeartbeat();
    this._heartbeatTimer = setInterval(() => {
      if (this.isOpen()) this.send({ type: 'PING' });
    }, 25000);
  }

  _stopHeartbeat() {
    if (this._heartbeatTimer) { clearInterval(this._heartbeatTimer); this._heartbeatTimer = null; }
  }

  send(obj) {
    if (this.isOpen()) {
      this.ws.send(JSON.stringify(obj));
    } else {
      // Небольшой буфер на время реконнекта (JOIN_ROOM и т.п.)
      if (this._sendQueue.length < 50) this._sendQueue.push(obj);
    }
  }

  close() {
    this._manualClose = true;
    this._clearReconnectTimer();
    this._stopHeartbeat();
    this._sendQueue = [];
    if (this.ws) {
      try { this.ws.close(); } catch (e) {}
      this.ws = null;
    }
  }
}
