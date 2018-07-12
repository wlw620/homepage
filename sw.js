const VERSION = '10.0.0.0';
const HOST_NAME = location.host;
const isCORSRequest = (url) => {
  return url.search(HOST_NAME) === -1;
};
const whiteList = [
  'localhost:3000',
  'localhost:4000'
];
const isWhiteList = (url) => {
  if (!whiteList.length) return false;
  let st = false;
  whiteList.forEach(item => {
    if (url.search(item) > -1) st = true;
  });
  return st;
}


self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        'http://localhost:3000/dist/group_demo.js',
        'http://localhost:3000/dist/group_component.js'
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


self.addEventListener('sync', (e) => {
  console.log(`service worker需要进行后台同步，tag: ${e.tag}`);

  if (e.tag === 'sync') {
    let request = new Request('http://localhost:4000/api/sync', {
      mode: 'cors',
      method: 'GET'
    });

    e.waitUntil(
      fetch(request).then((response) => {
        response.json().then(console.log.bind(console));
        return response;
      })
    );
  }
});



self.addEventListener('fetch', (e) => {
  let req = null;
  let url = e.request.url;

  if (isWhiteList(url)) {

    if (isCORSRequest(url)) {
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
  }
});

self.addEventListener('notificationclick', (e) => {
  console.log(2222222);
});

self.addEventListener('push', (e) => {
  console.log(111111);

  e.waitUntil(
    self.registration.showNotification("PUSH")
  );
});


function addToCache(req) {
  console.log("req:::", req);
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
