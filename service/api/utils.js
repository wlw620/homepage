module.exports = {
  save(obj) {
    let {
      uniqueid,
      subscription
    } = obj;

    return new Promise((r, j) => {
      db.findOne({
        'subscription.endpoint': subscription.endpoint
      }, (err, res) => {
        if (err) {
          j(err);
          return;
        }
        if (res) {
          console.log('已存在');
          res.uniqueid = uniqueid;
          db.update({
            subscription
          }, res, {}, err => {
            if (err) {
              j(err);
              return;
            }
            r(obj);
          });
          return;
        }
        db.insert(obj, (err, item) => {
          if (err) {
            j(err);
            return;
          }
          console.log('存储完毕');
          r(obj);
        });
      });
    });
  }
}
