const staticCacheName = 'restaurant-reviews-v17';

self.addEventListener('install', function(event) {
  // console.log("Service Worker installed");
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './service_worker.js',
        './css/responsive_index.css',
        './css/responsive_restaurant.css',
        './css/styles.css',
        './img/1.webp',
        './img/2.webp',
        './img/3.webp',
        './img/4.webp',
        './img/5.webp',
        './img/6.webp',
        './img/7.webp',
        './img/8.webp',
        './img/9.webp',
        './img/10.webp',
        './js/dbhelper.js',
        './js/indexController.js',
        './js/main.js',
        './js/restaurant_info.js',
      ]);
    })
  );
  // console.log("cache successful");
});

// deletes old cache
self.addEventListener('activate', function(event) {
  // console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
      // console.log("Old cache removed");
    })
  );
});

self.addEventListener('fetch', function(event) {
  // console.log("Service Worker starting fetch");
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          // console.log("new data added to cache", event.request.url);
          return response;
        }).catch(function(error) {
          // console.log("What is wrong with me service worker?", error);
          return fetch('img/dr-evil.gif');
        });
      });
    })
  );
});