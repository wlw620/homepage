const path = require('path');
const nedb = require('nedb');
const db = new nedb({
  filename: path.resolve(__dirname, '../../data/save.db'),
  autoload: true
});

module.exports = {
  save(obj) {
    let {
      uniqueid,
      subscription
    } = obj;

    return new Promise((resolve, reject) => {
      db.insert(obj, (err) => {
        if (err) reject(err);

        console.log('存储完毕');
        resolve(obj);
      });
    });
  }
}
