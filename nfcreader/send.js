//Hello here's some code for Traces
var currentStory = "";
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

//COM PORT has to be read and changed accordingly in windows. It can be read in the Arduino IDE. 


const NFCport = new SerialPort('COM7', {
  baudRate: 115200
  } , function (){
    const parser = NFCport.pipe(new Readline());
    parser.on('data', function (data) {
      console.log(typeof(data));
      if (data == "" || data == undefined || data == " " || data == null || isNaN(data)){
        return
      }
  console.log("Analyzing traces...");
  console.log("Current Story: " + data);
  socketNFC.emit('onCurrentStory', data);
  //eventually this will have to be replaced with the parsed story
screenPort.write("The current card is " + data + " ");
  
})
  }
);

const screenPort = new SerialPort('COM9', {
  baudRate: 115200
  }
);


var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketNFC = require('socket.io')(http);

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

//This should also send to a second serial port to display the text. Could possibly do without serial port. 

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/libraries'));
app.use(express.static(__dirname + '/assets'));

socketNFC.once('connection', function(socket)
{
	console.log('Connecting to the stream of time.');
});

http.listen(8080, function()
{

	console.log('Open localhost:8080 in your web browser!');
});