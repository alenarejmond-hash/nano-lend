// Файл: sw.js
// КОГДА ВНОСИШЬ ПРАВКИ В КОД ВИЗИТКИ, ПРОСТО ПОМЕНЯЙ ТУТ 'v1' НА 'v2' (и так далее)
const CACHE_NAME = 'premium-world-v1'; 

// Что сохраняем в память телефона для работы без интернета
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/bg-creator.jpg',
  '/bg-creator.mp4',
  '/avatar-creator.jpg',
  '/greeting.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Удаляем старые кэши, если версия поменялась
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Слушаем команду от визитки "Пользователь нажал кнопку ОБНОВИТЬ"
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting(); // Жестко применяем новый код
  }
});