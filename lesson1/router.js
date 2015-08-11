function route(handle, pathname,request,response) {
    // console.log("About to route a request for "+ pathname);
    // call handle
    var fn = handle[pathname];
    if (typeof fn == "function") {
        fn(request,response);
        console.log('reuqest for ' + pathname + ' deal successfully')
    } else {
        console.log('route not found for ' + pathname);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("not found!");
        response.end();
    }
}

exports.route = route;