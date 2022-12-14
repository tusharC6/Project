var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendFile( __dirname + "/" + "Broadcast1.html" ); 
});

var clients = 0;
io.on('connection', function(socket) {
   clients++;
   socket.emit('newclientconnect',{ msg: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ msg: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ msg: clients + ' clients connected!'})
   });
});

http.listen(2000, function() {
   console.log('listening on localhost:2000');
});

