const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  router.get('/api/mockData1', async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = {
      text: "pwa aaa"
    };
  });
  router.get('*', async (ctx, next) => {
    if (ctx.request.header.referer !== 'http://localhost:3000/api/mockData1') {
      ctx.response.type = 'html';
      ctx.response.body = fs.createReadStream(path.resolve('./', 'index.html'));
    }
  });
};
