const fs = require('fs');
const path = require('path');

module.exports = (router) => {
  // 首页view
  router.get('/', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.join(__dirname, '../index.html'));
  });
};
