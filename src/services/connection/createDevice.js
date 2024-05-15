import axios from "axios"

const saveSetting = async (data, accessToken) => {
        try {
            const response = await axios.post("/api/settings/connection/add-device", data, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response
        } catch (error) {
            console.error("Terjadi kesalahan saat mengirim data:", error);
            return error
        }
    };

export default saveSetting;