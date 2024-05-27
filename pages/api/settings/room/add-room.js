const url = {
    post: "http://localhost:8000/api/create/rooms/",
    getPut: "http://localhost:8000/api/get/put/rooms/",
    getAll: "http://localhost:8000/api/all/get/put/rooms/"
};

const fetchOptions = (method, accessToken, body = null) => ({
    method: method,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    },
    ...(body && { body: JSON.stringify(body) })
});

const fetchData = async (endpoint, options) => {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
};

export default async function handler(req, res) {
    if (req.method === "PUT") {
        if (!req.body.roomID) {
            return res
                .status(400)
                .json({ error: "roomID is required for PUT requests" });
        }

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res
                .status(401)
                .json({ message: "Authorization header is missing" });
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        const putUrl = `${url.getPut}${req.body.roomID}/`;
        const options = fetchOptions("PUT", accessToken, req.body);

        try {
            const data = await fetchData(putUrl, options);
            return res.status(200).json(data);
        } catch (error) {
            return res
                .status(
                    error.message.startsWith("Error:")
                        ? parseInt(error.message.slice(7))
                        : 500
                )
                .json({ message: error.message });
        }
    }

    if (req.method === "POST") {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res
                .status(401)
                .json({ message: "Authorization header is missing" });
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        const { user, name, roomID } = req.body;
        if (typeof user !== "number" || user <= 0) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Invalid or missing name" });
        }

        const roomUrl = roomID ? `${url.getPut}${roomID}/` : url.getAll;
        const options = fetchOptions("GET", accessToken);

        try {
            const toData = await fetchData(roomUrl, options);
            const isRoomNameExist = toData.some(room => room.name === name);
            if (isRoomNameExist) {
                return res
                    .status(200)
                    .json({
                        info: "Room name already exists",
                        room: toData
                    });
            }

            const actionUrl = url.post;
            const actionMethod = "POST";
            const data = await fetchData(
                actionUrl,
                fetchOptions(actionMethod, accessToken, req.body)
            );
            return res.status(200).json(data);
        } catch (error) {
            return res
                .status(
                    error.message.startsWith("Error:")
                        ? parseInt(error.message.slice(7))
                        : 500
                )
                .json({ message: error.message });
        }
    }

    res.setHeader("Allow", ["POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
