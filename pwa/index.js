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

    subscribeUserToPush(registration)
      .then((subscription) => {
        console.log('subscription success', registration);
        return {
          subscription: subscription,
          uniqueid: new Date().getTime()
        };
      })

      .then(body => {
        console.log('uniqueid', body.uniqueid);

        sendSubscriptionToServer(JSON.stringify(body))
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log("sendSubscriptionToServer: " + data.status);
          });
      })
      .catch(err => {
        console.log('subscription err', err);
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
