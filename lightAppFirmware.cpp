/**
 * LightApp
 * Particle Core Firmware App
 * Carlos Paelinck
 */

#include "application.h"

static const int RED_PIN = D2;
static const int YELLOW_PIN = D1;
static const int GREEN_PIN = D0;

bool executingSequence = false;

static int red_signal = LOW;
static int yellow_signal = LOW;
static int green_signal = LOW;
static uint8_t status_bit_mask = 0;

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
  Spark.variable("lightstatus", &status_bit_mask, INT);

  // attachInterrupt(D0, lightStatusChanged, CHANGE);
  // attachInterrupt(D1, lightStatusChanged, CHANGE);
  // attachInterrupt(D2, lightStatusChanged, CHANGE);
}

void loop() {
  status_bit_mask = ((red_signal << 1) | (yellow_signal << 2) | (green_signal << 3));
}

void lightStatusChanged() {
  Spark.publish("status_upd", String(status_bit_mask));
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
    red_signal = !red_signal;
    digitalWrite(RED_PIN, red_signal);
    executingSequence = false;
    return red_signal;

  } else if (command.equals("yellow")) {
    yellow_signal = !yellow_signal;
    digitalWrite(YELLOW_PIN, yellow_signal);
    executingSequence = false;
    return yellow_signal;

  } else if (command.equals("green")) {
    green_signal = !green_signal;
    digitalWrite(GREEN_PIN, green_signal);
    executingSequence = false;
    return green_signal;

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
