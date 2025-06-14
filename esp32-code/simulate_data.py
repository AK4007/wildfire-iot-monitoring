import paho.mqtt.client as mqtt
import ssl
import json
import time
import random
from datetime import datetime

# AWS IoT Core details
ENDPOINT = "avv980iif33tb-ats.iot.us-east-2.amazonaws.com"
PORT = 8883
TOPIC = "wildfire/data"

# Paths to your certificate files
CA_PATH = "AmazonRootCA1.pem"
CERT_PATH = "780e4d66d877ece411682c45ad465aa7966e8c8a6e3b5c57f90f0bf01c71b08a-certificate.pem.crt"
KEY_PATH = "780e4d66d877ece411682c45ad465aa7966e8c8a6e3b5c57f90f0bf01c71b08a-private.pem.key"

# Create the MQTT client
client = mqtt.Client()

# Configure TLS/SSL
client.tls_set(ca_certs=CA_PATH,
               certfile=CERT_PATH,
               keyfile=KEY_PATH,
               tls_version=ssl.PROTOCOL_TLSv1_2)

# Connect to AWS IoT Core
client.connect(ENDPOINT, PORT, keepalive=60)

# Start MQTT loop
client.loop_start()

def generate_sensor_data():
    return {
        "device_id": "WildfireSimulationDevice",
        "timestamp": datetime.utcnow().isoformat(),
        "temperature": round(random.uniform(20.0, 35.0), 2),
        "humidity": round(random.uniform(40.0, 70.0), 2),
        "smoke": random.randint(0, 100),
        "flame": random.choice([0, 1]),
        "latitude": 43.4516,    # Static value for Kitchener, Ontario
        "longitude": -80.4925
    }

try:
    while True:
        payload = json.dumps(generate_sensor_data())
        print(f"Publishing to {TOPIC}: {payload}")
        client.publish(TOPIC, payload, qos=1)
        time.sleep(2)

except KeyboardInterrupt:
    print("Exiting...")
    client.loop_stop()
    client.disconnect()
