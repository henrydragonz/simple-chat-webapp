
// npm install express
var express = require('express');
// npm install socket.io
var socket = require('socket.io');

// setup our app
var app = express();

// creating server
var server = app.listen(4000, () => {
  // code here
});

// serve static files
app.use(express.static('public'));

// socket setup
var io = socket(server);


// listen for an event that has been made connection in our browser
/* socket fallback function - number of connection of the server */
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

  // disconnect socket
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

});
