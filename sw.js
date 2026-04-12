const CACHE_NAME = 'premium-world-v2'; // ВАЖНО: МЕНЯЙ ЭТУ ЦИФРУ (v3, v4...) ПРИ КАЖДОЙ ПРАВКЕ КОДА ВИЗИТКИ!

// Базовые файлы для кэша
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/bg-creator.jpg',
  '/bg-creator.mp4',
  '/avatar-creator.jpg',
  '/greeting.mp3'
];

self.addEventListener('install', event => {
  // Ждем, пока закэшируется база
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  // Удаляем старые версии кэша, если цифра CACHE_NAME изменилась
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
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  
  if (request.method !== 'GET') return;

  // 1. ОСОБЕННОСТЬ APPLE: Обработка видео (Range Requests)
  // Без этого хитрого кода видео в Safari не будет работать без интернета!
  if (request.headers.has('range')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const response = await cache.match(request.url);
        if (!response) {
          const fetchResponse = await fetch(request);
          if (fetchResponse.ok) cache.put(request.url, fetchResponse.clone());
          return fetchResponse;
        }
        const arrayBuffer = await response.arrayBuffer();
        const bytes = request.headers.get('range').match(/^bytes\=(\d+)\-(\d+)?/);
        const pos = Number(bytes[1]);
        const end = bytes[2] ? Number(bytes[2]) : arrayBuffer.byteLength - 1;
        return new Response(arrayBuffer.slice(pos, end + 1), {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Range', `bytes ${pos}-${end}/${arrayBuffer.byteLength}`],
            ['Content-Type', response.headers.get('Content-Type') || 'video/mp4'],
            ['Accept-Ranges', 'bytes'],
            ['Content-Length', end - pos + 1],
          ],
        });
      })
    );
    return;
  }

  // 2. Умное кэширование всего остального (QR, аватарки, сторонние скрипты)
  // Захватывает файлы на лету и сохраняет их в телефон
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok && request.url.startsWith('http')) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => null);
      
      return cachedResponse || fetchPromise; // Отдаем кэш мгновенно, если он есть
    })
  );
});

self.addEventListener('message', event => {
  // Команда от всплывающего окна "ОБНОВИТЬ СЕЙЧАС"
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});