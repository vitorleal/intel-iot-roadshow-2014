var SerialPort = require('serialport'),
    path       = require('path'),
    express    = require('express'),
    app        = express(),
    server     = require('http').Server(app),
    io         = require('socket.io').listen(server);

//Start in the 3000
server.listen(3000);
app.use("/public", express.static(path.join(__dirname, 'web')));

//The main route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/web/index.html');
});


//List the serial ports
SerialPort.list(function (err, ports) {
  var apc220 = /Silicon Labs/;

  ports.forEach(function (port) {
    if (apc220.test(port.manufacturer)) {
      connectApc220(port.comName)
    }
  });
});

//Connect to APC220
var connectApc220 = function (port) {
  //Create new serial connection
  var serialPort = new SerialPort.SerialPort(port, {
    baudrate: 9600
  }, false);

  //Open connection with the other APC220
  serialPort.open(function (err) {
    if (err) {
      console.log('failed to open: ' + err);

    } else {
      console.log('APC220 conneected!!!');
      console.log('--------------------');

      serialPort.on('data', function (data) {
        console.log('data received: ' + data);
      });

      io.on('connection', function (socket) {
        io.emit('open');

        //Send the START command
        socket.on('start', function () {
          serialPort.write('s', function (err, res) {
            console.log('start');
          });
        });

        //Send the QUIT command
        socket.on('end', function () {
          serialPort.write('q', function (err, res) {
            console.log('end');
          });
        });

        //Send the UP command
        socket.on('up', function () {
          serialPort.write('u', function (err, res) {
            console.log('up');
          });
        });

        //Send the DOWN command
        socket.on('down', function () {
          serialPort.write('d', function (err, res) {
            console.log('down');
          });
        });
      });
    }
  });
};
