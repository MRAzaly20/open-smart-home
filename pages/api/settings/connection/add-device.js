export default async function handler(req, res) {
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
        const {
            room,
            user,
            name,
            location,
            status,
            device_type,
            io_address,
            data_type,
            protocol,
            digital_value,
            analog_value,
            deviceID
        } = req.body;

        if (typeof room !== "string" || !room) {
            return res.status(400).json({ error: "Invalid room ID" });
        }
        if (typeof user !== "number" || user <= 0) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Invalid or missing name" });
        }
        if (!location || typeof location !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing location" });
        }
        if (!status || typeof status !== "string") {
            return res.status(400).json({ error: "Invalid or missing status" });
        }
        if (!device_type || typeof device_type !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing device type" });
        }
        if (!io_address || typeof io_address !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing IO address" });
        }
        if (!protocol || typeof protocol !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing protocol" });
        }
        if (typeof digital_value !== "boolean") {
            return res
                .status(400)
                .json({ error: "Invalid or missing digital value" });
        }
        if (typeof analog_value !== "number") {
            return res
                .status(400)
                .json({ error: "Invalid or missing analog value" });
        }
        if (typeof deviceID !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing device id" });
        }
        if (typeof data_type !== "string") {
            return res
                .status(400)
                .json({ error: "Invalid or missing data type" });
        }

        const url = {
            post: "http://localhost:8000/api/create/devices/",
            getPut: "http://localhost:8000/api/get/put/devices/"
        };
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        };
        const getData = async () => {
            const djangoGetRes = await fetch(url["getPut"] + `${deviceID}/`, {
                method: "GET",
                headers: headers
            });
            if (!djangoGetRes.ok) {
                return "no data";
            }

            return djangoGetRes.json();
        };
        try {
            const toData = await getData();
            console.log(JSON.stringify(toData));
            if (name !== toData.name) {
                const djangoResponse = await fetch(url["post"], {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(req.body)
                });

                if (!djangoResponse.ok) {
                    throw new Error(`Error: ${djangoResponse.status}`);
                }

                const data = await djangoResponse.json();
                res.status(200).json(data);
            }
            if (name === toData.name) {
                const djangoResponse = await fetch(
                    url["getPut"] + `${deviceID}/`,
                    {
                        method: "PUT",
                        headers: headers,
                        body: JSON.stringify(req.body)
                    }
                );

                if (!djangoResponse.ok) {
                    throw new Error(`Error: ${djangoResponse.status}`);
                }

                const data = await djangoResponse.json();
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST", "GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
