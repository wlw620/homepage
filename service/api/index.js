const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');

const app = new Koa();

router.get('/api/mockData', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.response.body = {
    text: '111PWA ！！！'
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
