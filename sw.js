const CACHE_NAME = 'yt-script-pro-v14';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instalar el Service Worker y guardar en caché los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones de red (para funcionar offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo desde la caché si existe, si no, búscalo en internet
        return response || fetch(event.request);
      })
  );
});