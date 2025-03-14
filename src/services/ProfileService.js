import axios from "axios";

export default {
    sendGetProfileRequest(userId) {
        return axios.get('/profile', {
                params: {
                    userId: userId
                }
            }
        );
    },
    sendUpdateProfileRequest(userId, userData) {
        return axios.put('/profile', userData,{
            params: {
                userId: userId,
            }
        });
    }
}