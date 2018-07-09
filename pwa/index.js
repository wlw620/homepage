if (navigator.serviceWorker) {

  // 注册
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {

      // 注册成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope);


      let serviceWorker;

      if (registration.installing) {

        serviceWorker = registration.installing;
      }
      else if (registration.waiting) {

        serviceWorker = registration.waiting;
      }
      else if (registration.active) {

        serviceWorker = registration.active;
      }

      if (serviceWorker) {
        serviceWorker.addEventListener('statechange', (e) => {
          console.log('ServiceWorker statechange: ' + e.target.state);
        });
      }

    })
    .catch(function (err) {

      // 注册失败
      console.log('ServiceWorker registration failed: ', err);
    });
}
