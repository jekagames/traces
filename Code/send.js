//Hello here's some code for Traces
var currentStory = "";
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
var express = require('express');
var app = express();
var http = require('http').Server(app); 
var socketNFC = require('socket.io')(http);

//COM PORT has to be read and changed accordingly in windows. It can be read in the Arduino IDE. For Raspberry Pis, it's ls /dev/tty* in the console.  
//'COM9' in WINDOWS, '/dev/ttyACM1' on Raspberry Pi

const screenPort = new SerialPort('/dev/ttyACM1', {
  baudRate: 115200 
  });

//'COM7' in WINDOWS, '/dev/ttyACM0' on Raspberry Pi
const NFCport = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
  });

const parser = NFCport.pipe(new Readline());
parser.on('data', function (data) {
console.log(typeof(data));
if (data == "" || data == undefined || data == " " || data == null || isNaN(data)){
        return
      }
  console.log("Analyzing traces...");
  console.log("Current Story: " + data);
  socketNFC.emit('onCurrentStory', data);   
});

socketNFC.on('connection', function(communications)
{
  console.log('Connecting to the stream of time.');
  screenPort.write("\r\r\r\r");
  communications.on('storyChunk', function(parsedChunk) {
var lcdText = parsedChunk;
lcdText = lcdText.toString();
console.log("Received Chunks: " + lcdText);
screenPort.write(lcdText);
})
});

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/libraries'));
app.use(express.static(__dirname + '/assets'));

http.listen(8080, function()
{
	console.log('Open localhost:8080 in your web browser!')
});