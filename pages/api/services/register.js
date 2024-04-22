export default async (req, res) => {
    if (req.method === "POST") {
        const validateFields = fields => {
            for (const field of fields) {
                if (!field) {
                    return false;
                }
            }
            return true;
        };

        const {
            name,
            password,
            email,
            first_name,
            last_name,
            phoneNumber,
            address
        } = req.body;
        //const { phone_number, address } = req.body.user_data;
        const accountUser = {
            username: name,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            user_profile: {
                phone_number: phoneNumber.toString(),
                address: address
            }
        };
        const isValid = validateFields([
            name,
            password,
            email,
            first_name,
            last_name,
            phoneNumber.toString(),
            address
        ]);
        console.log("username", name);
        console.log("password", password);
        console.log("email", email);
        console.log("first_name", first_name);
        console.log("last_name", last_name);
        console.log("address", address);
        console.log("phone", phoneNumber.toString());

        if (!isValid) {
            return res
                .status(400)
                .json({
                    message: "All fields are required and cannot be empty"
                });
        }

        try {
            const djangoResponse = await fetch(
                "http://localhost:8000/api/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accountUser)
                }
            );

            if (djangoResponse.ok) {
                res.status(200).json({ message: "Register successful" });
            } else {
                const errorResult = await djangoResponse.json();
                res.status(djangoResponse.status).json({
                    message: "Register failed",
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
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
