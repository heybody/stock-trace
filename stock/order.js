var pool  = require('./db');

function Order() {};

module.exports = Order;

//存储
Order.saveOrUpdate = function(item, callback) {
  // item 数据结构由api指定
  pool.acquire(function(err, db) {
    if (err) {
      return callback(err); //错误，返回 err 信息
    }
    db.collection('Orders', function(err, collection) {
      if (err) {
        return callback(err); //错误，返回 err 信息
      }
      //将数据插入 Orders 集合
      collection.update({
        p_id: item.p_id,
        uid: item.uid
      }, item, {
        safe: true,upsert:true
      }, function(err, data) {
        if (err) {
          return callback(err);
        }
        pool.release(db);
        callback(null, data['result']); //成功！err 为 null，并返回存储后的用户文档
      });
    });
 });

};


//批量处理对象
Order.batchSaveOrUpdate = function(p_type, items, i, callback, errArr, resultArr) {
  if (!errArr) {
    errArr = [];
  }
  if (!resultArr) {
    resultArr = [];
  }
  var len = items.length;
  if (i < len) {
    var item = items[i];
    item.p_type = p_type;
    Order.saveOrUpdate(item, function(err, result) {
      if (err) {
        console.log(err);
      }
      // console.log(p_type+"="+i+" deal ok ");
      errArr.push(err);
      resultArr.push(result);
      Order.batchSaveOrUpdate(p_type, items, ++i, callback, errArr, resultArr);
    });
  }
  else {
    callback(errArr, resultArr);
  }
};