const SerialPort = require('serialport');
const NFCport = new SerialPort('/COM8', function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
});

NFCport.on('currentStory', function (data) {
  console.log('currentStory', data);
});
