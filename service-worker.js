/* 自毁型 Service Worker：老读者浏览器里残留的 2025 旧版 SW 会被此文件替换并清除缓存 */
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all([
      self.registration.unregister(),
      caches.keys().then(function(names) {
        return Promise.all(names.map(function(n) { return caches.delete(n); }));
      })
    ]).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) {
  /* 全部直连网络，不再拦截 */
});
