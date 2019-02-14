var currentStory = "Story 0";
const SerialPort = require('serialport');
//COM PORT has to be read and changed accordingly in windows from the Arduino IDE. Maybe there's a way to make the code auto-select the correct port? 
//Or maybe this will just be easier in Linux
const NFCport = new SerialPort('COM7', {
  baudRate: 115200
  }
);

NFCport.on('data', function (data) {
  //console.log(data);
  //socket.emit('data', data);
  socket.emit('data', currentStory);
});

const Readline = require('@serialport/parser-readline');
const parser = NFCport.pipe(new Readline({ delimiter: '\n' }));
NFCport.pipe(parser);
//console.log(NFCport);
parser.on('data', function (data) {
	//console.log("Analyzing traces...");
  //console.log(data);
  currentStory = data;
  console.log(currentStory);
  //console.log("");
});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

//This should also send to a second serial port to display the text. Could possibly do without serial port. 

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/libraries'));
app.use(express.static(__dirname + '/assets'));

socket.on('connection', function(socket)
{
	console.log('Connecting to the stream of time.');
});

http.listen(8080, function()
{
	console.log('Open localhost:8080 in your web browser!');
});



