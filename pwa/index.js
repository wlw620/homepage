import register from './register';
import subscribeUserToPush from './push';
import sendSubscriptionToServer from './send';

/**
 * 注册 Service Worker
 */
if (window.navigator.serviceWorker) {

  register('/sw.js')
    .then(registration => {
      return Promise.all([
        registration,
        askPermission()
      ]);
    })
    .then((result) => {
      let registration = result[0];
      // 注册成功
      console.log("serviceWorker register success:" + registration.scope);
      registration.showNotification("推送成功~~~");
    })
    .catch((err) => {
      // 注册失败
      console.log('ServiceWorker registration failed: ', err);
    });

}


/**
 * 后台同步
 */
if (window.SyncManager) {

  navigator.serviceWorker.ready.then(function (registration) {
    window.myBgSync = (tag) => {
      registration.sync.register(tag).then(function () {
        console.log('后台同步已触发', tag);
      }).catch(function (err) {
        console.log('后台同步触发失败', err);
      });
    }
  });

}

/**
 *  订阅推送
 */
if (window.PushManager) {

  navigator.serviceWorker.ready.then((registration) => {

    return registration.pushManager.getSubscription()
      .then(async (subscription) => {

        // 防止重复注册
        if (subscription) {
          return subscription;
        }

        // 注册 subscribe
        return subscribeUserToPush(registration);

      }).then((subscription) => {
        console.log('subscription success', subscription);
        let body = {
          subscription: subscription,
          uniqueid: new Date().getTime()
        };
        console.log('uniqueid', body.uniqueid);

        // 存储到后端
        sendSubscriptionToServer(JSON.stringify(body))
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log("sendSubscriptionToServer: " + data.status);
          });

      });

  });

}


function askPermission() {
  return new Promise((resolve, reject) => {
    var permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}
