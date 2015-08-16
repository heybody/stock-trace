var child_process = require("child_process");

function spawn(mainModule) {
    var worker = child_process.spawn('node', [ mainModule ], {
        stdio: [ 0, 1, 2, 'ipc' ]
    });
    worker.on('message',function(msg){
      console.log('msg from child '+ msg);
    })
  console.log(worker.pid+"run success ");
    worker.on('exit', function (code) {
        console.log(worker.pid+"exit,code = "+code);
        if (code !== 0) {
            spawn(mainModule);
        }
    });
}

spawn('run.js');