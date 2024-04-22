import mqtt from "mqtt";
import React, { useEffect, useState } from "react";

const mqttUri = "wss://broker.emqx.io:8084/mqtt";

const options = {
    clientId: "nextjs"
};

const Mqtt = () => {
    const [messages, setMessages] = useState(["init"]);
    const [val, setVal] = useState("");

    const addMessage = () => {
        // const newMessges = messages.concat(Math.random());
        // setMessages(newMessges);
        const client = mqtt.connect(mqttUri);
        client.publish("posts/create", "test mqtt");
    };

    useEffect(() => {
        const client = mqtt.connect(mqttUri);
        client.on("connect", () => {
            // subscribe to the /posts topic
            client.subscribe("posts/create");
            client.subscribe("comments/create");
            client.subscribe("moderation/moderated");
        });

        client.on("message", (topic, message) => {
            if (topic === "posts/create") {
                // Parse the message into a JavaScript object
                const post = message.toString();

                // Destructure the post object
                console.log(post);
                alert(post);
                setVal(post);
            }
        });
        console.log(client);
        return () => {
            if (client) {
                client.unsubscribe("posts/create");
                client.end(client);
            }
        };
    }, [val]);

    return (
        <div>
            <button
                style={{ background: "rgba(255,0,0,.5)" }}
                onClick={addMessage}
            >
                addMessage
            </button>
            <h2>Received Messages: {val} </h2>
            <ul>
                {messages.map(message => (
                    <li key={Math.random()}>{message.toString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default Mqtt;
