//the receive code for telling the web page how to handle all this information
var receivedStory;
var soundInstance;

var socket = io();
			socket.on('data', function(data)
			{
				var newStory = data.trim();
				//if (data.match(/[a-z]/i) && data != receivedStory) 
				if (newStory != "") 
				{
					if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED))
					{
					receivedStory = newStory;
					console.log(receivedStory);
					storyTeller();
					}
				}
			});

			createjs.Sound.registerSound("log001.ogg", "log001");
			createjs.Sound.registerSound("log002.ogg", "log002");

function storyTeller() {
if (receivedStory == "Story 1") 
{
//play sound log001
soundInstance = createjs.Sound.play("log001");
}
else if (receivedStory == "Story 2")
{
	//play sound log002
soundInstance = createjs.Sound.play("log002");
}

else
{
	console.log("No story matches");
}

			}