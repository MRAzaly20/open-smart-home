// mqttService.js
import mqtt from 'mqtt';

const options = {
  rejectUnauthorized: false // Hanya untuk pengembangan, tidak disarankan untuk produksi
};

class MQTTService {
  constructor(brokerUrl) {
    this.client = mqtt.connect(brokerUrl);
    this.client.on('connect', () => console.log('Connected to MQTT broker'));
    this.client.on('error', (err) => console.error('Connection error:', err));
  }

  subscribe(topic, onMessage) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Subscribe error: ${err.message}`);
      }
    });
    this.client.on('message', onMessage);
  }

  publish(topic, message) {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Publish error: ${err.message}`);
      }
    });
  }

  close(topic) {
    this.client.unsubscribe(topic);
    this.client.end();
  }
}

export default MQTTService;
