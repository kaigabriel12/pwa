
const CACHE_NAME = 'conversao-cache-v1';

const urlsToCache = [
  '/',
  '../templates/index.html',
  '../static/css/style.css',
  '../static/bootstrap/css/bootstrap-grid.min.css',
  '../static/bootstrap/js/bootstrap.bundle.min.js',
  '../static/js/atualiza.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('conversao-cache-') &&
                   cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
  );
});