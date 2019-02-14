//the receive code for telling the web page how to handle all this information 
var receivedStory;

var socket = io();
			socket.on('data', function(data)
			{
				if (data && data != "" && data != receivedStory) 
				{
					receivedStory = data;
				console.log(receivedStory);
				}
			});