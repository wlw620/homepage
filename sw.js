const VERSION = '13.0';
const HOST_NAME = location.host;
const isCORSRequest = function (url, host) {
  return url.search(host) === -1;
};

/**
 * self 等同global window
 * caches 全局对象
 */
self.addEventListener('install', (e) => {
  // waitUntil 保证了在传入的Promise执行完之后才完成安装
  e.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([

      ]);
    })
  );
});


// 在这个流程我们可以做一些诸如释放缓存的操作，激活成功后，ServiceWorker状态会从activating变为activated
// sw.js
// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', (e) => {
  console.log(2222222);
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== "cacheName") {
          return caches.delete(key);
        }
      }));
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


// self.addEventListener('fetch', (e) => {
//   // let request = isCORSRequest(e.request.url, HOST_NAME) ?
//   //   new Request(e.request.url, {
//   //     mode: 'no-cors'
//   //   }) : e.request;

//     let request = e.request
//   /**
//    * Cache 接口的 match() 方法, 返回一个 Promise 解析为(resolve to)与 Cache 对象中的第一个匹配请求相关联的Response 。
//    * 如果没有找到匹配，Promise 解析为 undefined。
//    */
//   e.respondWith(
//     caches.match(request).then((response) => {
//       // 检测是否已经缓存过
//       if (response) {
//         return response;
//       }

//       let fetchRequest = request.clone();

//       return fetch(fetchRequest).then((response) => {

//         console.log(response.type);

//         // 检测请求是否有效
//         if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
//           return response;
//         }

//         var responseToCache = response.clone();

//         caches.open(VERSION).then(function (cache) {
//           cache.put(request, responseToCache);
//         });

//         return response;
//       });

//     })
//   );
// });
