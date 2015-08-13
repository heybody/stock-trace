var server = require("./server");
var router = require("./router");
var handlers = require("./handlers");

var handle ={}
handle["/"]= handlers.handlers.start;
// route by method 
for(var i in handlers.handlers ){
    handle['/'+i] = handlers.handlers[i];
}


server.start(router.route, handle);
