export const GAME_CONFIG = {
  START_GOLD: 50,
  FIXED_REWARD: 50,
  REVEAL_RANDOM_COST: 15,
  REVEAL_LENGTH_COST: 10,
  ORAL_HINT_COST: 10
};

// --- Online mode: адрес relay-сервера ---
// localhost/127.0.0.1 → локальный сервер разработки (ws://localhost:3001)
// прод → Render-инстанс (wss://). Любой адрес можно переопределить
// параметром ?server= (голый хост, ws://... или wss://...).
const isLocalhost = ['localhost', '127.0.0.1'].includes(location.hostname);

function normalizeWsUrl(raw) {
  let url = String(raw).trim().replace(/\/+$/, '');
  if (!/^wss?:\/\//i.test(url)) {
    const host = url.replace(/^https?:\/\//i, '');
    const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);
    url = (local ? 'ws://' : 'wss://') + host;
  }
  return url;
}

const serverOverride = new URLSearchParams(location.search).get('server');

export const DEFAULT_WS_URL = serverOverride
  ? normalizeWsUrl(serverOverride)
  : (isLocalhost
      ? 'ws://localhost:3001'
      : 'wss://rather-party-server.onrender.com'); // TODO: заменить на реальный Render-URL после деплоя

export const HTTP_SERVER_URL = DEFAULT_WS_URL.replace(/^ws(s?):\/\//i, 'http$1://');
