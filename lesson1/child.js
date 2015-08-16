process.on('message', function (msg) {
    console.log(process.pid+'child send msg ');
    process.send(msg);
});