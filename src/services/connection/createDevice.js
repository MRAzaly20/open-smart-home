import axios from "axios"

const saveSetting = async (data, accessToken) => {
        try {
            const response = await axios.post("http://localhost:3000/api/settings/connection/add-device", data, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } catch (error) {
            console.error("Terjadi kesalahan saat mengirim data:", error);
        }
    };

export default saveSetting;