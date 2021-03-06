// Your Service Worker. You can use its instance with the keyword `self`
// Example: self.addEventListener(...)

const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    '/',
    'index.html',
    '/assets/images/icon-192x192.png',
    '/assets/images/icon-512x512.png',
    '/assets/css/desktop.css',
    '/assets/css/fonts.css',
    '/assets/css/mobile.css',
    '/assets/css/normalize.css',
    '/assets/css/shell.css',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff',
    '/assets/js/dexie.min.js',
    '/assets/js/fontawesome-pro-5.13.0.min.js',
    '/assets/js/lazysizes.min.js',
    '/assets/js/trending.js',
    '/assets/js/saved.js',
    '/assets/js/search.js'
];

const appCaches = [
    appShellCacheName,
];

self.addEventListener('install', event => {
    console.log('Your service worker is being installed !');
    event.waitUntil(
      caches.open(appShellCacheName)
        .then(cache => {
          return cache.addAll(appShellFilesToCache);
        })
    );
  });

self.addEventListener('activate', event => {
    console.log('Your service worker has been activated, cleaning old caches..');
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return true;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
      .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request);
        })
      );
  });