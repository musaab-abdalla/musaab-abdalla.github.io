const CACHE_VERSION = 'restaurant-v3';
const FILESTOCACHE = [
  './', // alais to index.html
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  // '//normalize-css.googlecode.com/svn/trunk/normalize.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

// Install ServiceWorker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        return cache.addAll(FILESTOCACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate ServiceWorker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_VERSION) {
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Fetch ServiceWorker



self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(ersponse => response ||
    caches.open(CACHE_VERSION).then(cache => fetch(event.request).then((response) => {
      if (response.status === 404) {
        return new Response("Page not found.")
      }
      if(event.request.url.includes('restaurant.html') || event.request.url.includes('leaflet')){
        cache.put(event.request, response.clone());
      }
      return response;
    }))).catch(() =>
    new Response("You seems to be offline, and we didn't find any old cache for the URL."))
  );
});