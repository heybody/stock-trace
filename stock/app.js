var Fetcher = require("./fetcher");
var Order = require("./order");
var schedule = require("node-schedule");
// stock、au、ag、spif
var config = {
  stock: {
    max: 0,
    flag: true
  },
  au: {
    max: 0,
    flag: true
  },
  ag: {
    max: 0,
    flag: true
  },
  spif: {
    max: 0,
    flag: true
  }
};

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(0, 6);
rule.minute = [];
// 每N分钟执行一次
var rate = 1;
for (var i = 0; i * rate < 30; i++) {
  rule.minute.push(i * rate)
}

// stock任务
// var j = schedule.scheduleJob(rule, function() {
//   console.log('start scheduleJob ');
//   for (var p_type in config) {
//     var flag = config[p_type].flag;
//     if (flag) {
//       console.log('start  ' + p_type + " job");
//       fetchOneType(p_type, 1, 40);
//     }
//   }
// });

 for (var p_type in config) {
    var flag = config[p_type].flag;
    if (flag) {
      console.log('start  ' + p_type + " job");
      fetchOrders(p_type, 1, 200);
    }
  }

function fetchOrders(p_type, p, s) {
  Fetcher.fetchOrders(p_type, p, s, function(err, d) {
    if (err) {
      console.log(err);
    }
    console.log(p_type + " find data length=" + d.length);

    var needNextFetch = true;
    if (d.length == s && config[p_type].max != 0) {
      for (var i = 0; i < d.length; i++) {
        // 只要找到一个小于 就可以确定为不需要额外抓取
        if (config[p_type].max > d.length) {
          needNextFetch = false;
        }
      }
    }else {
      needNextFetch = false;
    }
    // 如果数据越界，需要调用前一页
    if (needNextFetch) {
      console.log(p_type + " fetch next");
      fetchOrders(p_type, ++p, s)
    }
    // 批量处理数据
    console.log(p_type+' start batch saveOrUpdate');
    Order.batchSaveOrUpdate(p_type, d,0, function(err, result) {
      console.log('batch deal success size=' + result.length + ",err=" + err);
    });

  });
}