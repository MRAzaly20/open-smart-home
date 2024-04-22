// pages/api/logout.js
export default async (req, res) => {
    if (req.method === "POST") {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        const refreshToken = req.body.refresh;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is missing" });
        }

        try {
            // Mengirim permintaan ke backend Django untuk mem-blacklist refresh token
            const djangoResponse = await fetch(
                "http://localhost:8000/api/logout/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Sertakan token JWT
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ refresh: refreshToken })
                }
            );

            if (djangoResponse.ok) {
                // Handle logout success di sisi Django
                res.status(200).json({ message: "Logout successful" });
            } else {
                // Handle error dari Django
                const errorResult = await djangoResponse.json();
                res.status(djangoResponse.status).json({
                    message: "Logout failed",
                    detail: errorResult
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
