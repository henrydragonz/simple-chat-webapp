var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

// server
var server = app.listen(8004, () => {
  // code here
});

// socket setup
var io = socket(server);

// static files
app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  // handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // handle broadcast event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
