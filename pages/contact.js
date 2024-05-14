import { useState, useEffect } from 'react';
import MQTTService from '@/services/connection/socket';

const MQTTComponent = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const brokerUrl = 'ws://localhost:8883';
  //const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
  const topic = 'your/topic';

  useEffect(() => {
    const mqttService = new MQTTService(brokerUrl);

    const handleReceivedMessage = (topic, message) => {
      setReceivedMessages(prevMessages => [...prevMessages, { topic, message: message.toString() }]);
    };

    mqttService.subscribe(topic, handleReceivedMessage);

    return () => {
      mqttService.close("your/topic");
    };
  }, []);

  const publishMessage = () => {
    const mqttService = new MQTTService(brokerUrl);
    mqttService.publish(topic, message);
    setMessage('');
    mqttService.close("your/topic");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={publishMessage}>Publish Message</button>

      <h2>Received Messages:</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{`${msg.topic}: ${msg.message}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default MQTTComponent;
