// Names of the cache used in this version of the service worker
const staticCacheName = 'restaurant-v1';

// A list of assets always want to be cached
const filesTocache = [
  './',
  '/frontend-nanodegree-restaurant-stage-1/index.html',
  '/frontend-nanodegree-restaurant-stage-1/css/styles.css',
  '/frontend-nanodegree-restaurant-stage-1/js/dbhelper.js',
  '/frontend-nanodegree-restaurant-stage-1/js/main.js',
  '/frontend-nanodegree-restaurant-stage-1/js/restaurant_info.js',
  '/frontend-nanodegree-restaurant-stage-1/js/indexController.js',
  '/frontend-nanodegree-restaurant-stage-1/data/restaurants.json',
  '/frontend-nanodegree-restaurant-stage-1/img/1.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/2.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/3.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/4.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/5.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/6.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/7.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/8.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/9.jpg',
  '/frontend-nanodegree-restaurant-stage-1/img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

// The install handler takes care of precaching the assets we always need
self.addEventListener('install', event => {
  event.waitUntil(
    // Open a cache....
    caches.open(staticCacheName)
      // Add assets to it
      .then(cache => cache.addAll(filesTocache))
      // Skip the 'waiting' lifecycle phase, to go directly from 'installed' to 'activated'
      .then(() => self.skipWaiting())
  );
});

// The activate handler delete all caches that aren't named in staticCacheName
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (staticCacheName.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            return caches.delete(cacheName);
          }
        })
      );
      // Tell the active service worker to take immediate control of all of the clients under its scope
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for assets from a cache
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    // We look for something in the caches that matches the request
    caches.match(event.request)
      .then(response => {
        // If we get something, we return it || response may be used only once
        if (response) {
          return response;
        }
        // We'll pass the request to fetch, which will use the network.
        return fetch(event.request)
          .then(response => {
            // TODO 5 - Respond with custom 404 page
            return caches.open(staticCacheName).then(cache => {
              if (event.request.url.indexOf('restaurant.html') !== -1 || event.request.url.indexOf('leaflet') !== -1) {
                // We need to save clone to put one copy in cache and serve second one
                cache.put(event.request.url, response.clone());
              }
              return response;
            });
          });
      }).catch(() => {
        // Cache or fallback
        return new Response(`<p>Failed to display contents from cache storage: ${event.request.url}</p>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
  );
});
