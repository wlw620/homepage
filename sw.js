
const VERSION = '1.0.0';
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


//在这个流程我们可以做一些诸如释放缓存的操作，激活成功后，ServiceWorker状态会从activating变为activated
self.addEventListener('activate', (e) => {
  e.waitUntil();
});

self.addEventListener('fetch', (e) => {

  /**
   * Cache 接口的 match() 方法, 返回一个 Promise 解析为(resolve to)与 Cache 对象中的第一个匹配请求相关联的Response 。
   * 如果没有找到匹配，Promise 解析为 undefined。
   */

  e.respondWith(
    caches.match(e.request).then((response) => {
      // 检测是否已经缓存过
      if (response) {
        return response;
      }

      let fetchRequest = e.request.clone();

      return fetch(fetchRequest).then((response) => {

        // 检测请求是否有效
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(VERSION).then(function (cache) {
          cache.put(e.request, responseToCache);
        });

        return response;
      });

    })
  );
});
