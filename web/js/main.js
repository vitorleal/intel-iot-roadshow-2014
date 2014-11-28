(function () {
  $(document).on('ready', function () {
    var socket = io.connect();

    socket.on('open', function (data) {
      console.log('open');
    });

    $('#start').on('click', function () {
      socket.emit('start');
    });

    $('#end').on('click', function () {
      socket.emit('end');
    });

    $('#up').on('click', function () {
      socket.emit('up');
    });

    $('#down').on('click', function () {
      socket.emit('down');
    });
  });
})();
