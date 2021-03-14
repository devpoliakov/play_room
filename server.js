var express = require('express');
var app = express();
var server = require('http').createServer(app);
var ioServ = require('socket.io');
var io = ioServ().listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server connection');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

