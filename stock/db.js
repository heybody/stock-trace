var Db = require('mongodb').Db,Connection = require('mongodb').Connection,
Server = require('mongodb').Server;

var settings = require("./settings");

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});