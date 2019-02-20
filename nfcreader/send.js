var currentStory = "";
const SerialPort = require('serialport');

//COM PORT has to be read and changed accordingly in windows. It can be read in the Arduino IDE. 
const NFCport = new SerialPort('COM7', {
  baudRate: 115200
  }
);

//const lcd = new Lcd('COM9', {rs: 12, e: 11, data: [5, 4, 3, 2], cols: 20, rows: 4, baudRate: 115200});
const screenPort = new SerialPort('COM9', {
  baudRate: 115200
  }
);

NFCport.once('data', function (data) {
  //console.log(data);
  //socket.emit('data', data);
  socket.emit('data', currentStory);
});

const Readline = require('@serialport/parser-readline');
const parser = NFCport.pipe(new Readline());
//{ delimiter: '\n' } -- was in Readline for readability
NFCport.pipe(parser);
//console.log(NFCport);
parser.on('data', function (data) {
	console.log("Analyzing traces...");
  console.log(data);
  currentStory = data.trim();
  console.log(currentStory);
  //can I nest these?
  screenPort.on('data', function(data) {
  socket.emit('data');
  currentStory = data.trim();
})
screenPort.write("The current card is " + currentStory + " ");
console.log(currentStory);


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

socket.once('connection', function(socket)
{
	console.log('Connecting to the stream of time.');
});

http.listen(8080, function()
{

	console.log('Open localhost:8080 in your web browser!');
});