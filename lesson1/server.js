var http = require("http");
var url = require("url");

function start(route,handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    //console.log("Request for "+ pathname +" received.");

    route(handle,pathname);
   
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hello Waaorld");
    response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT, process.env.IP);
  console.log("Server has started.");
}

exports.start = start;