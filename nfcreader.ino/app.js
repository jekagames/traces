var SerialPort = require('serialport');
var serialport = new SerialPort("COM8",
{
	parser: SerialPort.parsers.readline('\n')
});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

// app.use(express.static(__dirname + '/node_modules/createjs-soundjs/lib'));
// app.use(express.static(__dirname + '/sfx'));

io.on('connection', function(socket)
{
	console.log("Connecting to spacetime continuum...");
});

http.listen(8080, function()
{
	console.log('Open localhost:8080 in your web browser!');
});

var intensity = 0;

serialport.on('open', function()
{
	serialport.on('data', function(data)
	{
		io.emit("currentStory");
	});
});
