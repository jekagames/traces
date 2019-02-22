//Hello here's some code for Traces
var currentStory = "";
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketNFC = require('socket.io')(http);
var socketLCD = require('socket.io-client')(http);

//COM PORT has to be read and changed accordingly in windows. It can be read in the Arduino IDE. 
const screenPort = new SerialPort('COM9', {
  baudRate: 115200 
  });

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
screenPort.write("Hello there, cutie");
  //eventually this will have to be replaced with the parsed story  
})
});

socketLCD.on('storyChunk', function (chunk) 
    {
      var receivedChunks = chunk;
      console.log("RECEIVING CHUNKS" + receivedChunks);
       screenPort.write(receivedChunks);
       console.log("Now we're chunking!");
    }); 


app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

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