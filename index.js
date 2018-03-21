var express = require('express');
var socket = require('socket.io');

// App setyup
var app = express();
// server
var server = app.listen(8004, () => {
  console.log('listen to request on port 8004');
});
// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

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
