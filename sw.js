const CACHE_NAME = 'etml-games-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/css/html.css',
    '/assets/js/kiosk.js',
    '/assets/js/script.js',
    '/assets/js/data.js',
    '/assets/image/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
