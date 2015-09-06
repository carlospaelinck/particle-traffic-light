/**
 * LightApp
 * Particle Core Firmware App
 * Carlos Paelinck
 */

#include "application.h"

static const int RED_PIN = D2;
static const int YELLOW_PIN = D1;
static const int GREEN_PIN = D0;

bool executing_sequence = false;

volatile int red_signal = LOW;
volatile int yellow_signal = LOW;
volatile int green_signal = LOW;
uint8_t status_bit_mask = 0;
uint8_t previous_status_bit_mask = 0;

int toggle_light(String command);
int reset_lights(String command);
int sequence(String command);
int sequence_uk(String command);
void publish_status();

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(YELLOW_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);

  Spark.function("togglelight", toggle_light);
  Spark.function("resetlights", reset_lights);
  Spark.function("sequence", sequence);
  Spark.function("sequence_uk", sequence_uk);
  Spark.variable("lightstatus", &status_bit_mask, INT);
}

void loop() {
  int status_bit_mask = ((red_signal << 1) | (yellow_signal << 2) | (green_signal << 3));
}

void publish_status() {
  int status_bit_mask = ((red_signal << 1) | (yellow_signal << 2) | (green_signal << 3));
  Spark.publish("status_upd", String(status_bit_mask));
}

int sequence(String command) {
  if (executing_sequence) return -1;
  executing_sequence = true;

  int redTime = command.substring(0, 1).toInt() ?: 1;
  int yellowTime = command.substring(2, 3).toInt() ?: 1;
  int greenTime = command.substring(4, 5).toInt() ?: 1;
  int repeat = command.substring(6, 7).toInt() ?: 1;

  for (int idx = 0; idx < repeat; idx++) {
    green_signal = HIGH;
    publish_status();
    digitalWrite(GREEN_PIN, green_signal);
    delay(greenTime * 1000);

    green_signal = LOW;
    yellow_signal = HIGH;
    publish_status();
    digitalWrite(GREEN_PIN, green_signal);
    digitalWrite(YELLOW_PIN, yellow_signal);
    delay(yellowTime * 1000);

    yellow_signal = LOW;
    red_signal = HIGH;
    publish_status();
    digitalWrite(YELLOW_PIN, yellow_signal);
    digitalWrite(RED_PIN, red_signal);
    delay(redTime * 1000);

    red_signal = LOW;
    publish_status();
    digitalWrite(RED_PIN, red_signal);
  }

  executing_sequence = false;
  return 0;
}

int sequence_uk(String command) {
  if (executing_sequence) return -1;
  executing_sequence = true;

  int redTime = command.substring(0, 1).toInt() ?: 1;
  int yellowTime = command.substring(2, 3).toInt() ?: 1;
  int greenTime = command.substring(4, 5).toInt() ?: 1;
  int repeat = command.substring(6, 7).toInt() ?: 1;

  for (int idx = 0; idx < repeat; idx++) {
    green_signal = HIGH;
    publish_status();
    digitalWrite(GREEN_PIN, green_signal);
    delay(greenTime * 1000);

    green_signal = LOW;
    yellow_signal = HIGH;
    publish_status();
    digitalWrite(GREEN_PIN, green_signal);
    digitalWrite(YELLOW_PIN, yellow_signal);
    delay(yellowTime * 1000);

    yellow_signal = LOW;
    red_signal = HIGH;
    publish_status();
    digitalWrite(YELLOW_PIN, yellow_signal);
    digitalWrite(RED_PIN, red_signal);
    delay(redTime * 1000);

    yellow_signal = HIGH;
    publish_status();
    digitalWrite(YELLOW_PIN, yellow_signal);
    delay(yellowTime * 1000);

    yellow_signal = LOW;
    red_signal = LOW;
    publish_status();
    digitalWrite(RED_PIN, red_signal);
    digitalWrite(YELLOW_PIN, yellow_signal);
  }

  executing_sequence = false;
  return 0;
}

int toggle_light(String command) {
  if (executing_sequence) return -1;
  executing_sequence = true;

  if (command.equals("red")) {
    red_signal = !red_signal;
    publish_status();
    digitalWrite(RED_PIN, red_signal);
    executing_sequence = false;
    return red_signal;

  } else if (command.equals("yellow")) {
    yellow_signal = !yellow_signal;
    publish_status();
    digitalWrite(YELLOW_PIN, yellow_signal);
    executing_sequence = false;
    return yellow_signal;

  } else if (command.equals("green")) {
    green_signal = !green_signal;
    publish_status();
    digitalWrite(GREEN_PIN, green_signal);
    executing_sequence = false;
    return green_signal;

  } else {
    executing_sequence = false;
    return -1;
  }
}

int reset_lights(String command) {
  if (executing_sequence) return -1;
  executing_sequence = true;

  green_signal = LOW;
  yellow_signal = LOW;
  red_signal = LOW;
  publish_status();

  digitalWrite(RED_PIN, green_signal);
  digitalWrite(YELLOW_PIN, yellow_signal);
  digitalWrite(GREEN_PIN, red_signal);

  executing_sequence = false;
  return 0;
}
