import axios from "axios"

const createRoom = async (data, accessToken) => {
        try {
            const response = await axios.post("/api/settings/room/add-room", data, {
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

export default createRoom;