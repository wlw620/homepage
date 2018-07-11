import register from './register';
import subscribeUserToPush from './push';
import sendSubscriptionToServer from './send';

if (window.navigator.serviceWorker) {
  // 注册
  register('/sw.js').then(registration => {
    // 注册成功
    console.log("serviceWorker register success:" + registration.scope);
  }).catch((err) => {
    // 注册失败
    console.log('ServiceWorker registration failed: ', err);
  });
}

if (window.PushManager) {
  navigator.serviceWorker.ready.then((registration) => {
    // 订阅推送
    subscribeUserToPush(registration).then((subscription) => {
      console.log('pushManager success');
      let body = {
        subscription: subscription,
        uniqueid: new Date().getTime()
      };
      console.log('uniqueid', body.uniqueid);

      // 将生成的客户端订阅信息存储在自己的服务器上
      sendSubscriptionToServer(JSON.stringify(body)).then(res => {
        return res.json();
      }).then(data => {
        console.log("sendSubscriptionToServer: " + data.status);
      });
    });
  });
}
