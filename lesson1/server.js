var http = require("http");
var url = require("url");

<<<<<<< HEAD
function start(route,handlers){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request for "+ pathname +" received.");

    route(pathname);
    handlers[pathname](request);
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT, process.env.IP);;
=======
function start(route,handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    route(handle,pathname,request,response);
  }

  http.createServer(onRequest).listen(process.env.PORT, process.env.IP);
>>>>>>> lesson1
  console.log("Server has started.");
}

exports.start = start;