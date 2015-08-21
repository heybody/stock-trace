var settings = require('./settings');
var qs = require("querystring");
var httpUtil = require("./httpUtil");
// 抓取工具类
function Object(){
  
}
// stock、au、ag、spif
// order、 settlement
Object.fetch = function(callback,type,p,s,fetchType){
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
  httpUtil.get(url,30000,callback);
}

// stock、au、ag、spif
Object.fetchOrders = function(callback,type,p,s){
  this.fetch(callback,type,p,s,'order')
}

Object.fetchSettlements = function(callback,type,p,s){
  this.fetch(callback,type,p,s,'settlements');
}



