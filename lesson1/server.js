var http = require("http");
var url = require("url");

// server start
function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var i = 0;
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" +
        postDataChunk + "'."+i++);
    });
    request.addListener("end", function() {
      route(handle, pathname, request, postData);
    });

  }

  http.createServer(onRequest).listen(process.env.PORT, process.env.IP);
  console.log("Server has started.");
}

exports.start = start;
