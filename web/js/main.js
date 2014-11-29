(function () {
  //Create a socket connection
  var socket = io.connect();

  //Defaul commands
  var command = {
    emit: function (action) {
      socket.emit(action);
      console.log(action);
    },
    start: function () {
      command.emit('start');
    },
    end: function () {
      command.emit('end');
    },
    up: function () {
      command.emit('up');
    },
    down: function () {
      command.emit('down');
    }
  };

  //When document is ready
  $(document).on('ready', function () {
    //On socket connection open
    socket.on('open', function (data) {
      console.log('Open connection');
    });

    //Handle clicks
    $('#start').on('click', function () {
      command.start();
    });

    $('#end').on('click', function () {
      command.end();
    });

    $('#up').on('click', function () {
      command.up();
    });

    $('#down').on('click', function () {
      command.down();
    });

    //Talk to the drone
    annyang.debug();
    annyang.addCommands({
      'drone ligar': command.start,
      'drone desligar': command.end
    });
    annyang.setLanguage('pt-BR');
    annyang.start();
  });

  //Key down controls
  $(document).on('keydown', function (e) {
    //On enter click
    if (e.which === 13) {
      command.start();
    }

    //On esc click
    if (e.which === 27) {
      command.end();
    }

    //On up arrow click
    if (e.which === 38) {
      command.up();
    }

    //On down arrow click
    if (e.which === 40) {
      command.down();
    }
  });
})();
