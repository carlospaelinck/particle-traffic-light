/**
 * LightApp
 * Particle Core Firmware App
 * Carlos Paelinck
 */

#include "application.h"

enum LIGHT_BIT_MASK {
  RED = 1 << 1,
  YELLOW = 1 << 2,
  GREEN = 1 << 3
};

static const int RED_PIN = D2;
static const int YELLOW_PIN = D1;
static const int GREEN_PIN = D0;

static uint8_t lightStatusBitMask = 0;

class LightFirmware {
private:
  static int toggleLight(String command) {
    if (command.equals("red")) {
      bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::RED);
      digitalWrite(RED_PIN, !pinValue);
      return !pinValue;

    } else if (command.equals("yellow")) {
      bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::YELLOW);
      digitalWrite(YELLOW_PIN, !pinValue);
      return !pinValue;

    } else if (command.equals("green")) {
      bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::GREEN);
      digitalWrite(GREEN_PIN, !pinValue);
      return !pinValue;

    } else {
      return -1;
    }
  }

  static int sequence(String command) {
    bool
      turn_red_on = command.indexOf("r:t") != -1,
      turn_red_off = command.indexOf("r:f") != -1,
      turn_yellow_on = command.indexOf("y:t") != -1,
      turn_yellow_off = command.indexOf("y:f") != -1,
      turn_green_on = command.indexOf("g:t") != -1,
      turn_green_off = command.indexOf("g:f") != -1;

    if (turn_red_on) digitalWrite(RED_PIN, HIGH);
    if (turn_red_off) digitalWrite(RED_PIN, LOW);
    if (turn_yellow_on) digitalWrite(YELLOW_PIN, HIGH);
    if (turn_yellow_off) digitalWrite(YELLOW_PIN, LOW);
    if (turn_green_on) digitalWrite(GREEN_PIN, HIGH);
    if (turn_green_off) digitalWrite(GREEN_PIN, LOW);

    return 0;
  }

  static int resetLights(String command) {
    digitalWrite(RED_PIN, LOW);
    digitalWrite(YELLOW_PIN, LOW);
    digitalWrite(GREEN_PIN, LOW);
    return 0;
  }

public:
  uint8_t previousLightStatusBitMask = 0;

  LightFirmware() {
    Spark.function("togglelight", LightFirmware::toggleLight);
    Spark.function("resetlights", LightFirmware::resetLights);
    Spark.function("sequence", LightFirmware::sequence);
    Spark.variable("lightstatus", &lightStatusBitMask, INT);
  }

  void initOutputPins() {
    pinMode(RED_PIN, OUTPUT);
    pinMode(YELLOW_PIN, OUTPUT);
    pinMode(GREEN_PIN, OUTPUT);
  }

  void updateLightStatus() {
    int pinValues[3] = {
      digitalRead(RED_PIN),
      digitalRead(YELLOW_PIN),
      digitalRead(GREEN_PIN)
    };

    lightStatusBitMask = (
      (pinValues[0] << 1) |
      (pinValues[1] << 2) |
      (pinValues[2] << 3)
    );
  }
};

LightFirmware *lightFirmwareInstance = NULL;

void setup() {
  lightFirmwareInstance = new LightFirmware();
  lightFirmwareInstance->initOutputPins();
}

void loop() {
  lightFirmwareInstance->updateLightStatus();

  if (lightFirmwareInstance->previousLightStatusBitMask != lightStatusBitMask) {
    lightFirmwareInstance->previousLightStatusBitMask = lightStatusBitMask;
    Spark.publish("event:lightChange", String(lightStatusBitMask));
  }
}
