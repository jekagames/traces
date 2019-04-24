# T R A C E S
A game about trans time travelers coming to a present much like our own, and leaving traces of their time there in the places that meant something to them. 

# CREDITS 
Designed, Written and Created by Jess Rowan Marcotte<br>

# VOICE ACTING
System Voice - Natural Reader (modified)<br>
The Handler - Jess Rowan Marcotte<br>
Object 01 - Gina Hara<br>
Object 02 - Dietrich Squinkifer<br> 
Object 03, 04, 06 - Lukas Rowland<br>
Object 05 - Drew Pascoe<br>
Object 07 - Ida Toft<br>
Object 08 - Jordan McRae<br>
Object 09 - Thomas Deliva<br>
Object 10 - Ash Cheshire<br>
<br><br>

With thanks to Enric Llagostera for recording an earlier version of Object 05!<br> 

# 3D-PRINTED OBJECTS
Jess Marcotte (20x4 LCD cover, Arduino Uno Case top)<br>
brandroid64 (Brandon Bowles) (Customizable Raspberry Pi 3 (A+/B+) Case)<br>
djminnesota (Dan Johnson) (Arduino Uno Case bottom, heavily modified by Jess Marcotte)<br>

# SPECIAL THANKS TO
Enric Llagostera and Dietrich Squinkifer for their help with all of my programming questions and for helping me debug.<br><br>
Thomas Deliva for helping me talk through design issues and his Home Depot hardware expertise. 

# INSTALLATION INSTRUCTIONS & PITFALLS
When installing Node if playing on Windows, remember to install windows build tools (npm install --global --production windows-build-tools) as administrator as well as necessary packages. <br><br>

In order to make this work with an Arduino M4 Metro, do the following:<br><br>
Edit boards.h to include this board definition:<br><br>
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
Remember to install your own NPM packages in the game folder instead of using the Windows ones that are already there!

(since the package.json file is practically unreadable): serialport, socket.io, createjs-soundjs, express, lcd, forever 
(all other dependencies should auto-install)

# SETTING UP LCD SCREEN VIA SERIAL PORT BACKPACK 
Used the Pololu Serial Transmitter (https://www.pololu.com/docs/0J23) to set the EEPROM (permanent memory). Used the Adafruit LCD command guide for setup. 
Setting the Screen size (20x4):<br><br>
0xFE 0xD1 20 4<br><br>

Setting the screen colour:<br>
"Set RGB Backlight Color - 0xFE 0xD0 - Sets the backlight to the red, green and blue component colors. The values of can range from 0 to 255 (one byte). This is saved to EEPROM. Each color R, G, and B is represented by a byte following the command. Color values range from 0 to 255 (0xFF in hex). To set the backlight to Red, the command is 0xFE 0xD0 0xFF 0x0 0x0. Blue is 0xFE 0xD0 0x0 0x0 0xFF. White is 0xFE 0xD0 0xFF 0xFF 0xFF." -- https://learn.adafruit.com/usb-plus-serial-backpack/command-reference

# RASPBERRY PI SETUP 
1. Install node and then install all required node packages to a folder (I use traces folder on the desktop).
2. Download and extract repository to that same folder and replace the NPM packages folder with the one that you installed.
3. Change the USB ports (COM7 and COM9) for the correct ports on the Raspberry Pi:
-- In the console, with the NFC reader and the lcd screen unplugged, run "ls /dev/tty*"
-- Take note of the ports.
-- Plug in one of the devices, then run ls/dev/tty* again. 
-- Take note of the new port -- this port corresponds to whichever device you plugged in. 
-- Replace the port in the send.js file using the format "/dev/ttyXXXX"

4. Then, change directories to whichever folder you are running the program from. 
5. Send command "node send.js"
6. Open localhost:8080 in your browser

# SOUND 
1. Set the Pi to use the headphone jack instead of the HMDI connection for audio by entering:
"amixer cset numid=3 1" 

2. Use Iceweasel (Firefox) browser! 

# GET ICEWEASEL TO START ON BOOTUP ON THE PI 
Go to 
 /home/pi/.config/lxsession/LXDE-pi/autostart 
Edit autostart and add this line:
@sleep 5
@firefox-esr --start-fullscreen --start-maximized http://localhost:8080
//Disable the screensaver with a "#".

# DISABLE RESUME FROM CRASH 
1. In the Location bar, type about:config and press Enter.
2. The about:config "This might void your warranty!" warning page may appear. Click I'll be careful, I promise! to continue to the about:config page.
3. In the Search box at the top, type browser.sessionstore.resume_from_crash.
4. In the resulting grid, double-click on browser.sessionstore.resume_from_crash to set it to false.

# LAUNCHING NODE SERVER AND "SEND.JS" ON REBOOT
https://medium.com/@andrew.nease.code/set-up-a-self-booting-node-js-eb56ebd05549

1. Install PM2 globally. ("npm install -g pm2")
2. Execute "pm2 startup" and paste the resulting code in
3. Navigate to your file folder and use the command "pm2 start filename.js"
4. Execute "pm2 startup" again and paste the resulting code
5. "pm2 start filename.js" -- it should say that it can't re-execute it.
6. "pm2 save"
7. Reboot to test.



