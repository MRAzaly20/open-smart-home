import mqtt from "mqtt";
import useEffect from "react";
import useState from "react";

const mqttUri = "mqtt://broker.hivemq.com:1883";

const options = {
    userName: "",
    password: "",
    clientId: "",
    reconnectPeriod: 2000
};

export default async function GET(req, res) {
    const [messages, setMessages] = useState(["init"]);

    const addMessage = () => {
        const newMessges = messages.concat(Math.random());
        setMessages(newMessges);
    };

    useEffect(() => {
        const client = mqtt.connect("ws://localhost:8080");
        client.on("connect", () => {
            // subscribe to the /posts topic
            client.subscribe("posts/create");
            client.subscribe("comments/create");
            client.subscribe("moderation/moderated");
        });

        client.on("message", (topic, message) => {
            if (topic === "posts/create") {
                // Parse the message into a JavaScript object
                const post = JSON.parse(message.toString());

                // Destructure the post object
                console.log(post);
                alert(post);
                value = post;
            }
        });
        console.log(client);
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
}
