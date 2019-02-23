var receivedCue = "test";
var passedCue;
var soundInstance;
var socketNFC = io();
var socketChunk = io.connect('http://localhost:8080');

//DATABASE TO READ STORY AND AUDIO FILE DIRECTIONS FROM
//Managing text and audio through a spreadsheet (json dictionary)
//Make the spreadsheet then parse it into a json dictionary using Mr Data Converter or other service -- 
//https://shancarter.github.io/mr-data-converter/)
var database = {
  "1635431931": {"title":"story001", "text":"[You can see their traces permeating the space, tying echoes of their very beings to the artefacts that they left behind, to the spaces and things that meant something to them here. Track down the artefacts and spaces, and we can analyze the traces. That's what you're here to]", "audiofile":"log001"}
};

			createjs.Sound.registerSound("log001.ogg", "log001");
			createjs.Sound.registerSound("log002.ogg", "log002");



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
					receivedCue = newStory;
					console.log("Text and Audio Reference: " + receivedCue);
					// callStoryPrint(receivedCue);
					// storyAudio(audioID);
				}
			});

//WHEN/HOW SHOULD I CALL THESE? I wish javascript had a loop/on update function



//PLAY AUDIO

function getDatabase(raw_id){
  return database[raw_id.toString()];
  console.log("The database is being returned");
  //
}

function pickLogFile(audioID){
var rawAudioID = receivedCue.audiofile;
console.log("RAW AUDIO ID: " + rawAudioID);
var audioID = rawAudioID;
console.log("THIS IS THE PROCESSED AUDIO ID: " + audioID);
}

function storyAudio(audioID) {
if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED))
soundInstance = createjs.Sound.play(audioID);
console.log("Ooo sound should be playing.");
}

//ENRIC's awesome LCD text scroller

var lineMaxCharacters = 20;
var maxRows = 4;
var delayPerChunk = 1000;
var chunk;

console.log("Searching for traces...")
console.log(database);


function callStoryPrint(passedCue) {
var passedCue = getDatabase(receivedCue);
processRawText(receivedCue);
displayStoryNode(storynode);
displaySingleChunk(chunk);

}

// this expects a node with title, and rawtext, with chunks empty
function processRawText(passedCue){
  var rawText = passedCue.text;
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
  receivedCue.rows = rows;
  return receivedCue;
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
  }
}

//sending chunks
function displaySingleChunk(chunk){
	console.log(chunk);

socketChunk.on('storyChunk', (chunk) =>{
		parser: socketParser;
     console.log("Emitting chunks");
     socketChunk.emit('storyChunk', chunk);
     console.log("Emitted Chunk: "+ chunk);
});
}