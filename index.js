var SerialPort = require('serialport');

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

      serialPort.write('s', function (err, res) {
        console.log(res);
      });
    }
  });
};
