const path = require('path');
const nedb = require('nedb');
const db = new nedb({
  filename: path.resolve(__dirname, '../../data/save.db'),
  autoload: true
});

module.exports = {

  findAll() {
    return new Promise((resolve, reject) => {
      db.find({}, (err, list) => {
        if (err) {
          reject(err);
        } else {
          resolve(list);
        }
      });
    });
  },

  find(query) {
    return new Promise((resolve, reject) => {
      db.find(query, (err, list) => {
        if (err) {
          reject(err);
        } else {
          resolve(list);
        }
      });
    });
  },

  remove(obj) {
    return new Promise((resolve, reject) => {
      db.remove(obj, {
        multi: true
      }, (err, num) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(num);
      });
    });
  },

  save(obj) {
    let {
      uniqueid,
      subscription
    } = obj;

    return new Promise((resolve, reject) => {

      db.findOne({
        'subscription.endpoint': subscription.endpoint
      }, (err, res) => {

        if (err) {
          reject(err);
          return;
        }
        if (res) {
          console.log('已存在');
          res.uniqueid = uniqueid;
          db.update({
            subscription
          }, res, {}, err => {
            if (err) {
              reject(err);
              return;
            }
            resolve(obj);
          });
          return;
        }
        db.insert(obj, (err) => {
          if (err) reject(err);
          console.log('存储完毕');
          resolve(obj);
        });
      });
    });
  }
}
