const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const route = require('koa-route');

const app = new Koa();

const static = serve(path.join(__dirname, '../'));
console.log(path.join(__dirname, '../'));
const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.join(__dirname, '../index.html'));
};

app.use(static);
app.use(route.get('/', main));

app.listen(443);
