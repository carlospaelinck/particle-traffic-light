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
bool executingSequence = false;

static uint8_t lightStatusBitMask = 0;

int toggleLight(String command);
int resetLights(String command);
int sequence(String command);
int sequence_uk(String command);
void lightStatusChanged();

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(YELLOW_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);

  Spark.function("togglelight", toggleLight);
  Spark.function("resetlights", resetLights);
  Spark.function("sequence", sequence);
  Spark.function("sequence_uk", sequence_uk);
  Spark.variable("lightstatus", &lightStatusBitMask, INT);

  attachInterrupt(D0, lightStatusChanged, CHANGE);
  attachInterrupt(D1, lightStatusChanged, CHANGE);
  attachInterrupt(D2, lightStatusChanged, CHANGE);
}

void loop() {
  while (executingSequence) {
    Spark.process();
  }
}

void lightStatusChanged() {
  int pinValues[3] = {digitalRead(RED_PIN), digitalRead(YELLOW_PIN), digitalRead(GREEN_PIN)};
  lightStatusBitMask = ((pinValues[0] << 1) | (pinValues[1] << 2) | (pinValues[2] << 3));
  Spark.publish("event:lightChange", String(lightStatusBitMask));
}

int sequence(String command) {
  if (executingSequence) return -1;
  executingSequence = true;

  int redTime = command.substring(0, 1).toInt() ?: 1;
  int yellowTime = command.substring(2, 3).toInt() ?: 1;
  int greenTime = command.substring(4, 5).toInt() ?: 1;
  int repeat = command.substring(6, 7).toInt() ?: 1;

  for (int idx = 0; idx < repeat; idx++) {
    digitalWrite(GREEN_PIN, HIGH);
    delay(greenTime * 1000);

    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(YELLOW_PIN, HIGH);
    delay(yellowTime * 1000);

    digitalWrite(YELLOW_PIN, LOW);
    digitalWrite(RED_PIN, HIGH);
    delay(redTime * 1000);

    digitalWrite(RED_PIN, LOW);
  }

  executingSequence = false;
  return 0;
}

int sequence_uk(String command) {
  if (executingSequence) return -1;
  executingSequence = true;

  int redTime = command.substring(0, 1).toInt() ?: 1;
  int yellowTime = command.substring(2, 3).toInt() ?: 1;
  int greenTime = command.substring(4, 5).toInt() ?: 1;
  int repeat = command.substring(6, 7).toInt() ?: 1;

  for (int idx = 0; idx < repeat; idx++) {
    digitalWrite(GREEN_PIN, HIGH);
    delay(greenTime * 1000);

    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(YELLOW_PIN, HIGH);
    delay(yellowTime * 1000);

    digitalWrite(YELLOW_PIN, LOW);
    digitalWrite(RED_PIN, HIGH);
    delay(redTime * 1000);

    digitalWrite(YELLOW_PIN, HIGH);
    delay(yellowTime * 1000);

    digitalWrite(RED_PIN, LOW);
    digitalWrite(YELLOW_PIN, LOW);
  }

  executingSequence = false;
  return 0;
}

int toggleLight(String command) {
  if (executingSequence) return -1;
  executingSequence = true;

  if (command.equals("red")) {
    bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::RED);
    digitalWrite(RED_PIN, !pinValue);
    executingSequence = false;
    return !pinValue;

  } else if (command.equals("yellow")) {
    bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::YELLOW);
    digitalWrite(YELLOW_PIN, !pinValue);
    executingSequence = false;
    return !pinValue;

  } else if (command.equals("green")) {
    bool pinValue = bool(lightStatusBitMask & LIGHT_BIT_MASK::GREEN);
    digitalWrite(GREEN_PIN, !pinValue);
    executingSequence = false;
    return !pinValue;

  } else {
    executingSequence = false;
    return -1;
  }
}

int resetLights(String command) {
  if (executingSequence) return -1;
  executingSequence = true;

  digitalWrite(RED_PIN, LOW);
  digitalWrite(YELLOW_PIN, LOW);
  digitalWrite(GREEN_PIN, LOW);

  executingSequence = false;
  return 0;
}
