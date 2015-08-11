function start(request, response) {
    console.log("Request handler 'start' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("start!");
    response.end();
}

function upload(request, response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("upload!");
    response.end();
}

exports.start = start;
exports.upload = upload;