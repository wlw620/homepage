const VERSION = '8.0.0';
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


self.addEventListener('push', (e) => {
  console.log("message");
  // var title = 'Yay a message.';
  // var body = 'We have received a push message.';
  // var icon = '/images/icon-192x192.png';
  // var tag = 'simple-push-demo-notification-tag';
  // var data = {
  //   doge: {
  //     wow: 'such amaze notification data'
  //   }
  // };
  // e.waitUntil(
  //   self.registration.showNotification(title, {
  //     body: body,
  //     icon: icon,
  //     tag: tag,
  //     data: data
  //   })
  // );
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
