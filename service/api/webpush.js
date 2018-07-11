const Koa = require('koa');
const serve = require('koa-static');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const utils = require('./utils');
const webpush = require('web-push');
const app = new Koa();
const router = new Router();


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


  // 插入单项
  // db.insert({
  //   name: 'tom'
  // }, (err, ret) => {});
});

/**
 * 提交subscription信息，并保存
 */
router.get('/push', async (ctx, next) => {
  let list = await find();

  pushMessage(body);
});


/**
 * 向push service推送信息
 * @param {*} subscription
 * @param {*} data
 */
function pushMessage(subscription, data = {}) {
  webpush.sendNotification(subscription, data).then(data => {
    console.log('push service的相应数据:', JSON.stringify(data));
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


// 允许跨域
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 设置router
app.use(router.routes());

app.listen(5000);
