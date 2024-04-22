// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mqtt from "mqtt";
export default async function GET(req, res) {
    let value;
    const client = mqtt.connect("mqtt://localhost:1883");
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
            value = post;
            res.status(200).json({ status: post });
        }
    });
    console.log(client);
}
