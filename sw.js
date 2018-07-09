const VERSION = '16.0';
const HOST_NAME = location.host;
const isCORSRequest = function (url, host) {
  return url.search(host) === -1;
};


self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(cache => {
      console.log("haha");
      return cache.addAll([

      ]);
    })
  );
});



self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {

      let cacheList = cacheNames.map((cacheName) => {

        // 如果当前版本和缓存版本不一致
        if (cacheName !== VERSION) {
          return caches.delete(cacheName);
        }
      });

      return Promise.all(cacheList);
    })
  );

  return self.clients.claim();
});



self.addEventListener('fetch', (e) => {
  let req = null;
  let url = e.request.url;
  if (url.indexOf('cors=1') !== -1) {
    req = new Request(url, {
      mode: 'cors'
    });
  } else {
    req = e.request.clone();
  }

  e.respondWith(
    caches.open(VERSION).then(cache => {
      return cache.match(url);
    }).then((response) => {
      return response || addToCache(req);
    })
  );
});



function addToCache(req) {
  return fetch(req.clone()).then((resp) => {
    let cacheResp = resp.clone();
    if (resp.status !== 200 || (resp.type !== 'basic' && resp.type !== 'cors')) {
      return resp;
    }
    caches.open(VERSION).then(cache => {
      cache.put(req.clone(), cacheResp);
    });
    return resp;
  });
}
