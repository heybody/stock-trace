var mongodb = require("mongodb"),poolModule = require('generic-pool');
var settings = require("./settings");
var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        var server_options={'auto_reconnect':false,poolSize:1};
        var db_options={w:-1};
        var mongoserver = new mongodb.Server(settings.host, settings.port,server_options );
        var db=new mongodb.Db(settings.db, mongoserver, db_options);
        db.open(function(err,db){
            if(err)return callback(err);
            callback(null,db);
        });
    },
    destroy  : function(db) { db.close(); },
    max      : 10,
    idleTimeoutMillis : 30000,
    log : false 
});
module.exports  = pool;