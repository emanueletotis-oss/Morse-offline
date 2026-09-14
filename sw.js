const CACHE_NAME = 'morse-app-v1';
const ASSETS = [
  './',
  './index.html',
  // Aggiungi qui eventuali altri file usati (es. './style.css', './script.js', file audio, ecc.)
];

// Installazione: salva i file nella cache locale dell'iPhone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione: pulisce vecchie cache se aggiorni l'app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Intercettazione richieste: risponde dalla cache se sei offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});