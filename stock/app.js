 var httpUtil = require("./httpUtil");
 var Order = require("./order");

// var str  = "{\"p_id\":\"506489\",\"uid\":\"7018723\",\"invester_id\":\"6000198\",\"risk_manager_id\":\"6000328\",\"operation_direction\":\"0\",\"sub_type\":\"9\",\"pno\":\"Hs150821506489\",\"stock_code\":\"002697\",\"stock_amount\":\"700\",\"stock_name\":\"\\u7ea2\\u65d7\\u8fde\\u9501\",\"fund\":\"10000.0000\",\"start_price\":\"0.000000\",\"buy_way\":\"0\",\"deal_time\":1440140400,\"update_time\":1440140400,\"invester_nick\":\"\\u5fc3\\u5374\\u5bc2\\u5be5\",\"invester_pic\":\"\",\"nickname\":\"\\u91d1\\u82b1\\u8bd5\\u8d31\",\"pic\":\"http:\\\/\\\/tp2.sinaimg.cn\\\/2634167513\\\/50\\\/5654079528\\\/1\"}";
// var item = JSON.parse(str);
// item.invester_nick = "test";
 Order.saveOrUpdate(item,function(err,data){
   console.log(data);
 });
  var url='http://2.umoving.sinaapp.com/order.php?p=1&s=2&type=stock';
    httpUtil.get(url,30000,function(err,data){    
      if(err){
        console.log(err);
      }
      data = eval(data);
      var orders = new Array();
      for(var i=0; i < data.length; i++){
        orders.push(JSON.parse(data[i]));
      }
      console.log(orders);
    });
 