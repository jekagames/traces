const SerialPort = require('serialport');
const NFCport = new SerialPort('COM8', function (err) {
  baudrate: 115200;
  if (err) {
    return console.log('Error: ', err.message)
  }

});

NFCport.on('open', function (data) {
  console.log('currentStory', data);
  socket.emit('currentStory', data);
});

const Readline = require('@serialport/parser-readline')
const parser = port.pipe(new Readline({ delimiter: '\n' }))
NFCport.pipe(parser);
parser.on('data', function (data) {
  console.log('Timestream data received' + data);
});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

socket.on('connection', function(socket)
{
	console.log('Connecting to the stream of time.');
});

http.listen(8080, function()
{
	console.log('Open localhost:8080 in your web browser!');
});

