var currentStory = "Story 0";
const SerialPort = require('serialport');
//COM PORT has to be read and changed accordingly in windows from the Arduino IDE. Maybe there's a way to make the code auto-select the correct port? 
//Or maybe this will just be easier in Linux
const NFCport = new SerialPort('COM7', {
  baudRate: 115200
  }
);

const screenPort = new SerialPort('COM9', {
  baudRate: 115200
  }
);

NFCport.on('data', function (data) {
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
	//console.log("Analyzing traces...");
  //console.log(data);
  currentStory = data;
  console.log(currentStory);
  //console.log("");
});

screenPort.on('data', function(data) {
console.log("hello!");
}
)

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

//Managing text and audio through a spreadsheet (json dictionary)
//Make the spreadsheet then parse it into a json dictionary using Mr Data Converter or other service -- 
//https://shancarter.github.io/mr-data-converter/)
var database = {
  "1635431931": { "title":"story001", "text":"[You can see their traces permeating the space, tying echoes of their very beings to the artefacts that they left behind, to the spaces and things that meant something to them here. Track down the artefacts and spaces, and we can analyze the traces. That's what you're here to]", "audio_filename":"log001.ogg"}
}

var lineMaxCharacters = 20;
var maxRows = 4;
var delayPerChunk = 1000;

console.log("Initial info:")
console.log(database);

function getStoryLine(raw_id){
  return database[raw_id.toString()];
}

var testStoryLine = getStoryLine("121928132");

console.log(testStoryLine);
console.log(processRawText(testStoryLine));
displayStoryNode(testStoryLine);

// this expects a node with title, and rawtext, with chunks empty
function processRawText(storyline){
  var rawText = storyline.text;
  var words = rawText.split(" ");
  var rows = [];
  var currentRow = "";

  console.log(words);

  for (i = 0; i < words.length; i++){
    if(currentRow.length + words[i].length > lineMaxCharacters){
      // we need to split
      // add current row to array
      rows.push(currentRow.trim());
      // create a new row
      currentRow = words[i] + " ";
    }
    else {
      currentRow += words[i] + " ";
    }
  }
  rows.push(currentRow.trim());
  storyline.rows = rows;
  return storyline;
}

function displayStoryNode(storynode){
  // sends the text to serialport 4 rowas at a time
  var lastIndex =-1;
  var chunks = [];
  for(i = 0; i < storynode.rows.length; i++) {
    var msg = "";
    var chunk = storynode.rows.slice(i, i + 4);
    msg = chunk.join(" ");
    lastIndex = i+3;
    chunks.push(msg);
  }
  for (d = 0; d < chunks.length; d++){
    var display = chunks[d];
    setTimeout(displaySingleChunk, delayPerChunk*(d+1), display);
  }
}

function displaySingleChunk(chunk){
  //instead of logging to console, emit to the serial port 
  console.log(chunk);
}



