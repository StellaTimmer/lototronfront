import axios from "axios";

export default {
    sendLoginRequest(username, password) {
        return axios.get('', {
            params:{
                username: username,
                password: password
            }
        });
    }
}