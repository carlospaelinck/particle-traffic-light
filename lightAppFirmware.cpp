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

  static int performSequence(String command) {
    if (command == NULL || command.length() < 8) return -1;

    int
      redTime = command.substring(0, 1).toInt(),
      yellowTime = command.substring(3, 4).toInt(),
      greenTime = command.substring(6, 7).toInt();

    LightFirmware::resetLights(NULL);

    digitalWrite(GREEN_PIN, HIGH);
    delay(greenTime * 1000);

    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(YELLOW_PIN, HIGH);
    delay(yellowTime * 1000);

    digitalWrite(YELLOW_PIN, LOW);
    digitalWrite(RED_PIN, HIGH);
    delay(redTime * 1000);

    digitalWrite(RED_PIN, LOW);

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
    Spark.function("sequence", LightFirmware::performSequence);
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
