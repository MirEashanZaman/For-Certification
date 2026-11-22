const float BETA = 3950;
const int THERMISTOR_PIN = A0;
const int GREEN_LED_PIN = 11;
const int YELLOW_LED_PIN = 12;
const int RED_LED_PIN = 13;

void setup() {
  Serial.begin(9600);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(YELLOW_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
}

void loop() {
  int analogValue = analogRead(THERMISTOR_PIN);
  float celsius = 1 / (log(1 / (1023.0 / analogValue - 1)) / BETA + 1.0 / 298.15) - 273.15;

  Serial.print("Temperature: ");
  Serial.print(celsius);
  Serial.println(" C");

  if (celsius < 30.0) {
    digitalWrite(GREEN_LED_PIN, HIGH);
    digitalWrite(YELLOW_LED_PIN, LOW);
    digitalWrite(RED_LED_PIN, LOW);
  } else if (celsius <= 80.0) {
    digitalWrite(GREEN_LED_PIN, LOW);
    digitalWrite(YELLOW_LED_PIN, HIGH);
    digitalWrite(RED_LED_PIN, LOW);
  } else {
    digitalWrite(GREEN_LED_PIN, LOW);
    digitalWrite(YELLOW_LED_PIN, LOW);
    digitalWrite(RED_LED_PIN, HIGH);
  }

  delay(500);
}
