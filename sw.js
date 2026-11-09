// Rather Party — Service Worker
// Стратегия: cache-first для статики, network-fallback + ленивое кэширование.
// Версию кэша бампаем при каждом обновлении ассетов — старые кэши удаляются на activate.
const CACHE_NAME = 'rather-party-v8';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './src/main.js',
  './src/core/GameConfig.js',
  './src/core/GameStateStore.js',
  './src/core/Match.js',
  './src/core/WordShifter.js',
  './src/data/nerfWords.js',
  './src/data/questions.js',
  './src/data/scenes.js',
  './src/i18n/I18nManager.js',
  './src/i18n/morphology.js',
  './src/i18n/questions.ru.js',
  './src/i18n/questions.fi.js',
  './src/i18n/ui.en.js',
  './src/i18n/ui.ru.js',
  './src/i18n/ui.fi.js',
  './src/net/NetworkManager.js',
  './src/net/OnlineSession.js',
  './src/ui/ScreenController.js',
  './src/utils/qrcode.js',
  './src/utils/sanitize.js',
  './src/audio/AudioManager.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Только GET-запросы к своему origin (шрифты, YouTube, QR — мимо кэша)
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Лениво складываем в кэш аудио/картинки и прочие валидные ответы
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Офлайн-фоллбэк для навигации — отдаём закэшированную оболочку
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
