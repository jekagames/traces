#T R A C E S
A game about trans time travelers coming to a present much like our own, and leaving traces of their time there in the places that meant something to them. 

#CREDITS 
Designed, Written and Created by Jess Rowan Marcotte

#VOICE ACTING
System Voice - Natural Reader (modified)
The Handler - Jess Rowan Marcotte
Object 10 - Ash Cheshire
Object 09 - Thomas Deliva
Object 01 - Gina Hara
Object 05 - Enric Llagostera
Object 02, 08 - Jordan McRae
Object 03, 04, 06 - Lukas Rowland
Object 07 - Dietrich Squinkifer


#SPECIAL THANKS TO
Enric Llagostera and Dietrich Squinkifer for their help with all of my programming questions and for helping me debug.

#INSTALLATION INSTRUCTIONS & PITFALLS
When installing Node, remember to install windows build tools (npm install --global --production windows-build-tools) as administrator as well as necessary packages. 

In order to make this work with an Arduino M4 Metro, do the following:
Edit boards.h to include this board definition:
#elif defined(_VARIANT_METRO_M4_)
#define TOTAL_ANALOG_PINS       NUM_ANALOG_INPUTS // 8
#define TOTAL_PINS              NUM_DIGITAL_PINS // 20
#define VERSION_BLINK_PIN       LED_BUILTIN // 13
#define IS_PIN_DIGITAL(p)       ((p) >= 0 && (p) <= 13) // 0..13 - Digital pins
#define IS_PIN_ANALOG(p)        ((p) >= 14 && (p) < 19) // 14..19 - Analog pins
#define IS_PIN_PWM(p)           (IS_PIN_DIGITAL(p) && digitalPinHasPWM(p))
#define IS_PIN_I2C(p)           ((p) == PIN_WIRE_SDA || (p) == PIN_WIRE_SCL) // SDA=22, SCL=23
#define IS_PIN_SERIAL(p)        ((p) == PIN_SERIAL1_RX || (p) == PIN_SERIAL1_TX) // RX=0, TX=1
#define PIN_TO_DIGITAL(p)       (p)
#define PIN_TO_ANALOG(p)        (p-A0)
#define PIN_TO_PWM(p)           PIN_TO_DIGITAL(p)

Add junk code at the start (a random declared variable, etc)
Disable the servo library
Make sure SerialUSB is defined as Serial instead. 

# PACKAGES REQUIRED FOR NPM 
(since the package.json file is practically unreadable): serialport, socket.io, createjs-soundjs, express, lcd, bindings, onoff, mutexify, file-uri-to-path, epoll, lodash.debounce, forever 

#SETTING UP LCD SCREEN VIA SERIAL PORT BACKPACK
Used the Pololu Serial Transmitter (https://www.pololu.com/docs/0J23) to set the EEPROM (permanent memory). Used the Adafruit LCD command guide for setup. 
Setting the Screen size (20x4):
0xFE 0xD1 20 4

Setting the screen colour:
"Set RGB Backlight Color - 0xFE 0xD0 - Sets the backlight to the red, green and blue component colors. The values of can range from 0 to 255 (one byte). This is saved to EEPROM. Each color R, G, and B is represented by a byte following the command. Color values range from 0 to 255 (0xFF in hex). To set the backlight to Red, the command is 0xFE 0xD0 0xFF 0x0 0x0. Blue is 0xFE 0xD0 0x0 0x0 0xFF. White is 0xFE 0xD0 0xFF 0xFF 0xFF." -- https://learn.adafruit.com/usb-plus-serial-backpack/command-reference
