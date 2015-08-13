var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(request, response) {
    var content = '';
   var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();

}

function upload(request, response) {
    var form  = new formidable.IncomingForm();
    form.parse(request,function(error, fields, files){
        fs.renameSync(files.upload.path,"/tmp/test.png");
        console.log("Request handler 'upload' was called.");
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.end();
    });
}

exports.start = start;
exports.upload = upload;