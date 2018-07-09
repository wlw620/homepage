if (navigator.serviceWorker) {
  // 注册
  navigator.serviceWorker.register('/homepage/sw.js').then(reg => {
    console.log('reg events at scope::: ' + reg.scope);
  }).catch(function (error) {
    console.log("Failedegister ServiceWorker", error);
  });
}
