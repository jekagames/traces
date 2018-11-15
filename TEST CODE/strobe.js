
var five = require("johnny-five"),
var board = new five.Board({
  port: "COM8"
});

for (i=0; i<=50; i++)
{
board.on("ready", function() {
  // Create an Led on pin 13
  var led = new five.Led(13);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
})
}
;