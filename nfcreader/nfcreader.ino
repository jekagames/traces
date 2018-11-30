#include <Servo.h>
#include <Boards.h>
#include <Firmata.h>
#include <FirmataConstants.h>
#include <FirmataDefines.h>
#include <FirmataMarshaller.h>
#include <FirmataParser.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

int cardid = 0;
String currentCardID = String(cardid);
//String currentStory = "story0";


// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (2)
#define PN532_MOSI (3)
#define PN532_SS   (4)
#define PN532_MISO (5)

// If using the breakout or shield with I2C, define just the pins connected
// to the IRQ and reset lines.  Use the values below (2, 3) for the shield!
#define PN532_IRQ   (2)
#define PN532_RESET (3)  // Not connected by default on the NFC Shield

// Uncomment just _one_ line below depending on how your breakout or shield
// is connected to the Arduino:
//use this line for a breakout or shield with an I2C connection:
Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

#if defined(ARDUINO_ARCH_SAMD)
// for Zero, output on USB Serial console, remove line below if using programming port to program the Zero!
// also change #define in Adafruit_PN532.cpp library file
#define Serial SerialUSB
#endif

void setup() {

  Serial.begin(115200);
  Serial.println("Hello!");
  
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  // Got ok data, print it out!
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  // configure board to read RFID tags
  nfc.SAMConfig();
  
  Serial.println("Waiting for an ISO14443A Card ...");
}

void loop() {

  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
    
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  if (success) {
    // Display some basic information about the card
    Serial.println("Found a trace...");
    //Serial.print("  UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    Serial.print("  UID Value: ");
    nfc.PrintHex(uid, uidLength);
    
    if (uidLength == 4)
    {
      // We probably have a Mifare Classic card ... 
      uint32_t cardid = uid[0];
      currentCardID = String(cardid);
      cardid <<= 8;
      cardid |= uid[1];
      cardid <<= 8;
      cardid |= uid[2];  
      cardid <<= 8;
      cardid |= uid[3]; 
      Serial.print("Analyzing trace...");
      Serial.println(cardid);
      currentCardID = cardid;
      Serial.println("Trace " + currentCardID + " found.");
    }
    Serial.println("Analyzing trace further...");
    Serial.println("");
      delay(1000);
  }


if (currentCardID == "17938683") {
  Serial.println("Story 1");
  //currentStory = "story 1";
  delay(800);
}  else if (currentCardID == "1635431931") {
    Serial.println("Story 2");
    //currentStory = "story 2";
    delay(800);
    }  else if (currentCardID == "285915387") {
    Serial.println("Story 3");
    //currentStory = "story 3";
    delay(800);
    }  else if (currentCardID == "4051744763") {
    Serial.println("Story 4");
    //currentStory = "story 4";
    delay(800);
    }  else if (currentCardID == "2446767611") {
    Serial.println("Story 5");
    //currentStory = "story 5";
    delay(800);
    }  else if (currentCardID == "107222141") {
    Serial.println("Story 6");
    //currentStory = "story 6";
    delay(800);
  }    else {
      Serial.println("Our systems can't seem to analyze this trace.");
      //currentStory = "Our systems can't seem to analyze this trace.";
    }
    delay(800);
}


