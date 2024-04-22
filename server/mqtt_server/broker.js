import mqtt from "mqtt";
import React, { useEffect, useState } from "react";

const mqttUri = "wss://{mqttUr}:443/mqtt";

const options = {
    userName: "",
    password: "",
    clientId: "nextjs",
    reconnectPeriod: 2000
};

const Mqtt = () => {
    const [messages, setMessages] = useState(["init"]);

    const addMessage = () => {
        const newMessges = messages.concat(Math.random());
        setMessages(newMessges);
    };

    let client = {};

    useEffect(() => {
        console.dir(client);
        if (client === undefined) {
            console.log(`client: ${client}`);
            client = mqtt.connect(mqttUri, options);
            client.subscribe("test");
            client.on("message", message => {
                setMessages(messages.concat(message.toString()));
            });

            return () => {
                if (client) {
                    client.unsubscribe("test");
                    client.end(client);
                }
            };
        }
    });

    return (
        <div>
            <button onClick={addMessage}>addMessage</button>
            <h2>Received Messages: </h2>
            <ul>
                {messages.map(message => (
                    <li key={Math.random()}>{message.toString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default Mqtt;
