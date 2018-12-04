// Names of the cache used in this version of the service worker
const staticCacheName = 'restaurant-v1';

// A list of resources always want to be cached
const urlToCache = [
  '/',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'js/indexController.js',
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
    caches.match(event.request).then(response => {
      if (response != undefined) {
        return response;
      } else {
        return fetch(event.request).then(response => {
          let responseClone = response.clone();
          caches.open(staticCacheName).then(cache => {
            cache.put(event.request, responseClone);
          });
          return resopnse;
        }).catch(() => caches.match('PAGE NOT FOUND'))
      }
    })
  );
});