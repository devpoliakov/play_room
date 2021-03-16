var express = require('express');
var app = express();
var server = require('http').createServer(app);
var ioServ = require('socket.io');
var io = ioServ().listen(server);

var baseTimer = 20;

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

	socket.on('vote', function(data){
		console.log('user makes a wage');
		if(baseTimer !== 0 ){
			baseTimer += 30;
		}
	});

	const intervalObj = setInterval(() => {
		
		io.sockets.emit('timer',{msg: baseTimer});

	  if(baseTimer == 0 )
	  	clearInterval(intervalObj);
	  baseTimer -= 1;

	}, 1000);

});




