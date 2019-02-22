//the receive code for telling the web page how to handle all this information
var receivedSound = "";
var receivedTextCue = "";
var soundInstance;
var socketNFC = io();
var socketChunk = io();

			socketNFC.on('onCurrentStory', function(data)
			{ 
				console.log("DATA IS BEING RECEIVED THROUGH NFC SOCKET");
				if (data == "" || data == undefined || data == " " || data == null || isNaN(data)){
        return
      }
				var newStory = data; 
				console.log(data);
				newStory.trim();
				console.log(newStory + " is being written to newStory");
				if (newStory != "") 
				{
					receivedTextCue = newStory;
					console.log("Text Reference: " + receivedTextCue);
					callStoryPrint();
					
					if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED))
					{
					receivedSound = newStory;
					console.log("Audio Reference: " + receivedSound);
					getStoryAudio(receivedSound);
					storyAudio(receivedSound);
					}
				}
			});

			createjs.Sound.registerSound("log001.ogg", "log001");
			createjs.Sound.registerSound("log002.ogg", "log002");

//DATABASE TO READ STORY AND AUDIO FILE DIRECTIONS FROM
//Managing text and audio through a spreadsheet (json dictionary)
//Make the spreadsheet then parse it into a json dictionary using Mr Data Converter or other service -- 
//https://shancarter.github.io/mr-data-converter/)
var database = {
  "scanned_item": { "tag_id": "1635431931", "title":"story001", "text":"[You can see their traces permeating the space, tying echoes of their very beings to the artefacts that they left behind, to the spaces and things that meant something to them here. Track down the artefacts and spaces, and we can analyze the traces. That's what you're here to]", "audio_file":"log001"}
}

//PLAY AUDIO

function getStoryAudio(receivedSound){
	//removed .tostring() to see if it solves trimming issues 
  return database[receivedSound];
  //
}

var testStoryAudio = getStoryAudio("scanned_item");
console.log("TAG ID for Audio: " + testStoryAudio);

function storyAudio(receivedSound) {

var rawAudioID = receivedSound["audio_file"];
  console.log("RAW AUDIO ID: " + rawAudioID);
  var audioID = rawAudioID.split(" ");
  console.log("THIS IS THE PROCESSED AUDIO ID: " + audioID);

// if (receivedSound == scanned_item.tag_id) 
// {
//play sound log00x
soundInstance = createjs.Sound.play(audioID);
console.log("Ooo sound should be playing.")
}


// else if (receivedSound == "17938683")
// {
// 	//play sound log002
// soundInstance = createjs.Sound.play("log002");
// }

// else
// {
// 	console.log("I can't identify this trace.");
// }


//ENRIC's awesome LCD text scroller

var lineMaxCharacters = 20;
var maxRows = 4;
var delayPerChunk = 1000;
var chunk;

console.log("Searching for traces...")
console.log(database);

function callStoryPrint() {

getStoryLine(receivedTextCue);
var currentStoryLine = getStoryLine("scanned_item");
console.log("TAG ID for Line: " + currentStoryLine);
processRawText(currentStoryLine);
displayStoryNode(currentStoryLine);
displaySingleChunk(chunk);
}

function getStoryLine(receivedTextCue){
	//removed .tostring() to see if it solves trimming issues 
  return database[receivedTextCue];
  //
}

// this expects a node with title, and rawtext, with chunks empty
function processRawText(receivedTextCue){
  var rawText = receivedTextCue.text;
  console.log(rawText);
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
  receivedTextCue.rows = rows;
  return receivedTextCue;
}

function displayStoryNode(storynode){
  // sends the text to serialport 4 rowas at a time
  var lastIndex =-1;
  var chunks = [];
  for (i = 0; i < storynode.rows.length; i++) {
    var msg = "";
    var chunk = storynode.rows.slice(i, i + 4);
    msg = chunk.join(" ");
    lastIndex = i+3;
    chunks.push(msg);
  }
  for (d = 0; d < chunks.length; d++){
    var display = chunks[d];
    setTimeout(displaySingleChunk, delayPerChunk*(d+1), display);
//Trying to fulfill that promise!
//setTimeout.then(console.log("Analyzing trace."), console.log("This trace is unreadable."));
  }
}

function displaySingleChunk(chunk){
  //instead of logging to console, emit to the serial port 
  console.log(chunk);
    socketChunk.emit('storyChunk', chunk);
    console.log("Emitting chunks");
}
//   );
// }