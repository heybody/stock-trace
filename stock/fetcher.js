var settings = require('./settings');
var qs = require("querystring");
var httpUtil = require("./httpUtil");
// 抓取工具类
function Fetcher(){
  
}
// stock、au、ag、spif
// order、 settlement
Fetcher.fetch = function(type,p,s,callback,fetchType){
  if(!type){
    type = 'stock';
  }
  // 第几页
  if(!p){
    p = 1;
  }
  // 页大小
  if(!s){
    s = 200;
  }
  var url = settings.url; 
  if(fetchType==="order"){
    url += "order.php";
  }else{
    url += "settlement.php";
  }
  var params={type:type,p:p,s:s};
  var p = qs.stringify(params);
  url += '?'+p;
  httpUtil.get(url,30000,function(err,_data){
    if(err){
      console.log(err);
    }
    var dataObj = JSON.parse(_data);
    var orders = new Array();
    for(var i=0; i < dataObj.length; i++){
      var order = JSON.parse(dataObj[i]);
      orders.push(order);
    }
    if(typeof callback == "function"){
      callback(err,orders);
    }
  });
}

// stock、au、ag、spif
Fetcher.fetchOrders = function(type,p,s,callback){
  this.fetch(type,p,s,callback,'order')
}

Fetcher.fetchSettlements = function(type,p,s,callback){
  this.fetch(type,p,s,callback,'settlements');
}

module.exports  = Fetcher;

