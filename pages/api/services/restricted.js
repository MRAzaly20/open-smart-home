// pages/api/logout.js
export default async function GET(req, res) {
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

    try {
        //console.log(accessToken);
        // Mengirim permintaan ke backend Django untuk mem-blacklist refresh token
        //console.log("hello restricted");
        const djangoResponse = await fetch(
            "http://localhost:8000/api/restricted/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Sertakan token JWT
                    Authorization: `Bearer ${accessToken}`
                }
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
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
