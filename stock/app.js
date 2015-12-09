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

var dayOfWeek =  new schedule.Range(1,5);
var fetchSize = 200; // 抓取大小
var rate = 2; // 每N分钟执行一次

var ruleOrder = new schedule.RecurrenceRule();
ruleOrder.dayOfWeek = dayOfWeek;
ruleOrder.minute = [];
var ruleSettlement = new schedule.RecurrenceRule();
ruleSettlement.dayOfWeek = dayOfWeek;
ruleSettlement.minute = [];

for (var i = 0; i * rate < 60 ; i++) {
  ruleOrder.minute.push(i * rate);
  ruleSettlement.minute.push(i * rate + 1);
}
// order job
var orderJob = schedule.scheduleJob(ruleOrder, function() {
  console.log('start order job ');
  for (var p_type in config) {
    var flag = config[p_type].flag;
    if (flag) {
      console.log('start  ' + p_type + " order job");
      fetchOrders(p_type, 1, fetchSize);
    }
  }
});

// settlement job
var settlementJob = schedule.scheduleJob(ruleSettlement, function() {
  for (var p_type in config) {
    var flag = config[p_type].flag;
    if (flag) {
      console.log('start  ' + p_type + " settlement job");
      fetchSettlements(p_type, 1, fetchSize);
    }
  }
});


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
    }
    else {
      needNextFetch = false;
    }
    // 如果数据越界，需要调用前一页
    if (needNextFetch) {
      console.log(p_type + " fetch next");
      fetchOrders(p_type, ++p, s)
    }
    // 批量处理数据
    console.log(p_type + ' start batch saveOrUpdate');
    Order.batchSaveOrUpdate(p_type, d, 0, function(err, result) {
      console.log('batch deal success size=' + result.length + ",err=" + err);
    });
  });
}


function fetchSettlements(p_type, p, s) {
  Fetcher.fetchSettlements(p_type, p, s, function(err, d) {
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
    }
    else {
      needNextFetch = false;
    }
    // 如果数据越界，需要调用前一页
    if (needNextFetch) {
      console.log(p_type + " fetch next");
      fetchSettlements(p_type, ++p, s)
    }
    // 批量处理数据
    console.log(p_type + ' start batch saveOrUpdate');
    Order.batchSaveOrUpdate(p_type, d, 0, function(err, result) {
      console.log('batch deal success size=' + result.length + ",err=" + err);
    });

  });
}