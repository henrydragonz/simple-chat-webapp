// make connection
var socket = io.connect('http://10.1.10.85:4000/');

// query DOM
var message   = $('#message'),
    handle    = $('#handle'),
    btn       = $('#send'),
    output    = $('#output'),
    feedback  = $('#feedback');
    list      = $('#list');
    // colors
    var back = ["blue","gray","red", "orange", "green","pink", "#2b2b2b"];
    var rand = back[Math.floor(Math.random() * back.length)];

// emit events
$(btn).on("click", () => {
  socket.emit('chat', {
    message: $(message).val(),
    handle: $(handle).val(),
    color: rand
  });
});

// broadcasting
$(message).on("keypress", () => {
  socket.emit('typing', handle.val());
});

// listen for events
socket.on('chat', (data) => {
  $(feedback).html("");
  $(output)
  .append($('<p></p>')
    .append($('<strong></strong>').text(data.handle+': ').css({'color' : data.color}))
    .append($('<span></span>').text(data.message))
  );
  $(list)
  .append($('<p></p>')
    .append($('<strong></strong>').text(data.handle).css({'color' : data.color}))
  );;
});

// listen broadcast events
socket.on('typing', (data) => {
  $(feedback).html(`<p>${data} is typing a message...</p>`);
  setTimeout( () => {
    $(feedback).html("");
  }, 4000)
});


// color of names

// $('div').css('background',rand);
