const cacheVersion = 'restaurant-v2';
const filesToCache = [
  '/index.html',
  './', // alais to index.html
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '//unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  // '//normalize-css.googlecode.com/svn/trunk/normalize.css',
  '//unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

// Install ServiceWorker
self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed');
  event.waitUntil(
    caches.open(cacheVersion)
      .then(cache => {
        console.log('ServiceWorker: Caching Files');
        cache.addAll(filesToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate ServiceWorker
self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheVersion) {
            console.log('ServiceWorker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Fetch ServiceWorker
self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching');
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)));
});