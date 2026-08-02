self.addEventListener('install', e => {
  e.waitUntil(caches.open('shama-v1').then(cache => cache.addAll(['/', '/try.html', '/try.css', '/try.js', '/logo.jpg'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});