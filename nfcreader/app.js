var currentStory = "Story 0";
const SerialPort = require('serialport');
const NFCport = new SerialPort('COM8', {
  baudRate: 115200
  }
);

NFCport.on('data', function (data) {
  //console.log(data);
  socket.emit('data', data);
});

const Readline = require('@serialport/parser-readline');
const parser = NFCport.pipe(new Readline({ delimiter: '\n' }));
NFCport.pipe(parser);
//console.log(NFCport);
parser.on('data', function (data) {
	console.log("Analyzing traces...");
  //console.log(data);
  currentStory = data;
  console.log(currentStory);
  console.log("");
});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/libraries/soundjs.min.js'));
app.use(express.static(__dirname + '/assets'));

socket.on('connection', function(socket)
{
	console.log('Connecting to the stream of time.');
});

http.listen(8080, function()
{
	console.log('Open localhost:8080 in your web browser!');
});

