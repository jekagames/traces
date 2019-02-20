# traces
NFC code with node js for a narrative game about time travel

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
