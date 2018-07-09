const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const serve = require('koa-static');
const path = require('path');

const static = serve(path.join(__dirname, '../'));

const app = new Koa();

// 设置静态资源目录
app.use(static);

router.get('/api/mockData', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.response.body = {
    text: 'PWA:4000 ！！！'
  }
});

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

app.listen(4000);
