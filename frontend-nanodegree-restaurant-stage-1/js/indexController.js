/**
 * Register service worker
 * if the service worker API is available, and it is registered once the page is loaded.
*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/frontend-nanodegree-restaurant-stage-1/sw.js')
        // Registration was successful
        .then(reg => console.log(`ServiceWorker registration successful with scope: ${reg.scope}.`))
        // registration failed
        .catch(err => console.log(`ServiceWorker registration failed: ${err}.`))
    })
  }
