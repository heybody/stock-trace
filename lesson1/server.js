var http = require("http");
var url = require("url");

// server start
function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, request, response);

  }

  http.createServer(onRequest).listen(process.env.PORT, process.env.IP);
  console.log("Server has started.");
}

exports.start = start;
