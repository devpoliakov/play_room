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
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/css/styles.css', function(req, res){
	res.sendFile(__dirname + '/public/css/styles.css');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});
});