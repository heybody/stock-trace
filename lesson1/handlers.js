var exec = require("child_process").exec;

function start(request, response) {
    var content = '';
    exec("ls -lah", function(error, stdout, stderr) {
        content = stdout;
    });
    console.log("Request handler 'start' was called.");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write(content);
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