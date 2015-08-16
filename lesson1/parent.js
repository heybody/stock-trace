var child_process = require("child_process");
var child = child_process.spawn('node', [ 'child.js' ], {
        stdio: [ 0, 1, 2, 'ipc' ]
    });
var i = 0;

child.on('message', function (msg) {
    console.log(process.pid+'main receive msg +'+msg);
    child.send(i++);
});
console.log('this main process id is '+process.pid);
child.send(i++);
