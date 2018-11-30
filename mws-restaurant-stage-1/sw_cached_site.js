const cacheVersion = 'restaurant-v2';

// Install ServiceWorker
self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed');
});

// Activate ServiceWorker
self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache != cacheVersion) {
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
    fetch(event.request)
      .then(res => {
      // Make copy/clone of response
        const responseClone = res.clone();
        // open cache
        caches.open(cacheVersion)
          .then(cache => {
            // add response to cache
            cache.put(event.request, responseClone);
          });
        return res;
    }).catch(err => caches.match(event.request).then(res => res))
  );
});