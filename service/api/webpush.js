const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const utils = require('./utils');
const webpush = require('web-push');

const app = new Koa();
const router = new Router();

// 设置gcm公钥 私钥
// const vapidKeys = {
//   publicKey: 'BJJIa2qCgMj5_FouPxvYp0aSdDRSjpfXMKKvDxJVBJQG8Biau_30iTL8Y7u7T1IzFCy3A7niEZNcJQp9E4tz39k',
//   privateKey: 'aU0wSsEdVwaKW9R02ggbtzs3ThQFDVmQIpPu5HmtKfY'
// };
const vapidKeys = webpush.generateVAPIDKeys();

// 设置网络 API 密钥
webpush.setGCMAPIKey('AIzaSyCH4COGm1uomdIoF8pmcOS1UQhsYygCQYQ');
console.log(vapidKeys.publicKey);
// 配置密钥及联系邮箱
webpush.setVapidDetails(
  'https://serviceworke.rs/',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


/**
 * 提交subscription信息，并保存
 */
router.post('/subscription', koaBody(), async ctx => {
  let body = ctx.request.body;
  if (typeof body === 'string') {
    body = JSON.parse(body);
  }
  await utils.save(body);
  ctx.response.type = 'json';
  ctx.response.body = {
    status: 0
  };
});

/**
 * 提交subscription信息，并保存
 */
router.post('/push', koaBody(), async ctx => {

  let body = typeof ctx.request.body === 'string' ?
    JSON.parse(ctx.request.body) : ctx.request.body;
  let {
    uniqueid
  } = body;
  let list = uniqueid ? await utils.find({
    uniqueid
  }) : await utils.findAll();

  let subscription;

  for (let i = 0; i < list.length; i++) {
    subscription = list[i].subscription;
  }

  let options = {
    TTL: 5
  };

  setTimeout(() => {
    webpush.sendNotification(subscription, null, options)
      .then(() => {
        status = '201';
      })
      .catch(function (error) {
        status = '500';
      });
  }, 2000);

  ctx.response.type = 'json';
  ctx.response.body = {
    status: '200'
  };

});


/**
 * 向push service推送信息
 */
function pushMessage(subscription, data = '默认文字') {
  webpush.sendNotification(subscription, data).then(data => {
    console.log('push service的相应数据');
    return;
  }).catch(err => {
    // 判断状态码，440和410表示失效
    if (err.statusCode === 410 || err.statusCode === 404) {
      console.log(err);
    } else {
      console.log(subscription);
      console.log(err);
    }
  })
}


/**
 * 设置跨域
 */
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


app.use(router.routes());

app.listen(5000);
