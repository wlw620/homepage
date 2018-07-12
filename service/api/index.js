const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const serve = require('koa-static');
const path = require('path');
const axios = require('axios');
const static = serve(path.join(__dirname, '../'));
const app = new Koa();

// 设置静态资源目录
app.use(static);

router.get('/api/sync', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.response.body = {
    msg: 'sync 成功!!!'
  };
});

router.get('/api/mockData', async (ctx, next) => {
  let data = {};
  await axios.get('https://xapi.elong.com/list/getlistdata/?indate=2018-07-10&outdate=2018-07-11&city=1640&usercityid=1640&pageindex=1')
    .then((response) => {
      data = response.data
    })
    .catch((error) => {
      console.log(error);
    });

  ctx.response.type = 'json';
  ctx.response.body = data;
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
