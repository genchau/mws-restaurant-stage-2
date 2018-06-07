const staticCacheName = 'restaurant-reviews-v23';

self.addEventListener('install', function(event) {
  // console.log("Service Worker installed");
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './service_worker.js',
        './manifest.json',
        './favicon.ico',
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
        './img/marker-icon-2x-red.png',
        './img/marker-shadow.png',
        './js/idb.js',
        './js/dbhelper.js',
        './js/indexController.js',
        './js/bouncemarker.js',
        './js/main.js',
        './js/restaurant_info.js',
        'http://localhost:1337/restaurants/',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        // 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN_r8OUuhp.woff',
        // 'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2',
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
        if (response) {
          // console.log("data fetched from cache");
          return response;
        }
        else {
          return fetch(event.request).then(function(networkResponse) {
            // console.log("data fetched from network", event.request.url);
            //cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function(error) {
            console.log("Unable to fetch data from network", event.request.url, error);
          });
        }
      });
    }).catch(function(error) {
      console.log("Something went wrong with Service Worker fetch intercept", error);
    })
  );
});