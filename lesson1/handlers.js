var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

var handlers = {
    'start': function(request, response) {
        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            "<img src='/show' />" +
            '<form action="/upload" enctype="multipart/form-data" ' +
            'method="post">' +
            '<input type="file" name="upload" multiple="multiple">' +
            '<input type="submit" value="Upload file" />' +
            '</form>' +
            '</body>' +
            '</html>';
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write(body);
        response.end();

    },
    upload: function(request, response) {
        var form = new formidable.IncomingForm();
        form.parse(request, function(error, fields, files) {
            fs.renameSync(files.upload.path, "/tmp/test.png");
            console.log("Request handler 'upload' was called.");
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            response.end();
        });
    },
    show: function(request, response) {
        fs.readFile('/tmp/test.png', function(error, file) {
            if (error) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(error + "\n");
                response.end();
            }
            else {
                response.writeHead(200, {
                    "Content-Type": "image/png"
                });
                response.write(file, "binary");
                response.end();
            }
        });
    }
}



exports.handlers = handlers;