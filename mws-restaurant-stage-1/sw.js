// Names of the cache used in this version of the service worker
const staticCacheName = 'restaurant-v3';

// A list of resources always want to be cached
const urlToCache = [
  '/mws-restaurant-stage-1/',
  '/mws-restaurant-stage-1/index.html',
  '/mws-restaurant-stage-1/css/styles.css',
  '/mws-restaurant-stage-1/js/dbhelper.js',
  '/mws-restaurant-stage-1/js/main.js',
  '/mws-restaurant-stage-1/js/restaurant_info.js',
  '/mws-restaurant-stage-1/js/indexController.js',
  '/mws-restaurant-stage-1/data/restaurants.json',
  '/mws-restaurant-stage-1/img/1.jpg',
  '/mws-restaurant-stage-1/img/2.jpg',
  '/mws-restaurant-stage-1/img/3.jpg',
  '/mws-restaurant-stage-1/img/4.jpg',
  '/mws-restaurant-stage-1/img/5.jpg',
  '/mws-restaurant-stage-1/img/6.jpg',
  '/mws-restaurant-stage-1/img/7.jpg',
  '/mws-restaurant-stage-1/img/8.jpg',
  '/mws-restaurant-stage-1/img/9.jpg',
  '/mws-restaurant-stage-1/img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

// The install handler takes care of precaching the resources we always need
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(urlToCache)
      )
      .then(() => self.skipWaiting())
  );
});

// The activate handler delete all caches that aren't named in staticCacheName
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != staticCacheName) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  );
});

// The fetch handler serves responses for resources from a cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || caches.open(staticCacheName).then(cache => {
          return fetch(event.request).then((response) => {
            if (response.status === 404) {
              return new Response('Page not found.')
            }
            if (event.request.url.indexOf('restaurant.html') != -1 || event.request.url.indexOf('leaflet') != -1) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      }).catch(() => new Response('<p>You seems to be offline, and we didn\'t find any old cache for the URL.</p>', {
        headers: { 'Content-Type': 'text/html' }
      }))
  );
});