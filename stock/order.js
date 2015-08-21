var mongodb = require('./db');

function Order() {
};

module.exports = Order;

//存储用户信息
Order.saveOrUpdate = function(item,callback) {
  // item 数据结构由api指定
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    db.collection('Orders', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将数据插入 Orders 集合
      collection.update({p_id:item.p_id,uid:item.uid},item,{safe:true}, function (err, data) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, data['result']);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};
