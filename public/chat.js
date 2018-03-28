// make connection
var socket = io.connect('http://192.168.1.7:8004/');

// query DOM
var message   = $('#message'),
    handle    = $('#handle'),
    btn       = $('#send'),
    output    = $('#output'),
    feedback  = $('#feedback');

// emit events
$(btn).on("click", () => {
  socket.emit('chat', {
    message: $(message).val(),
    handle: $(handle).val()
  });
  $(message).val("");
});

// broadcasting
$(message).on("keypress", () => {
  socket.emit('typing', handle.val());
});

// listen for events
socket.on('chat', (data) => {
  $(feedback).html("");
  $(output).append(`<p><strong> ${data.handle}: </strong> ${data.message} </p>`);
});

// listen broadcast events
socket.on('typing', (data) => {
  $(feedback).html(`<p>${data} is typing a message...</p>`);
  setTimeout( () => {
    $(feedback).html("");
  }, 4000)
});
