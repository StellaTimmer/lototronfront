import axios from "axios";

export default {

    sendPostNewUserRequest(newUser) {
        return axios.post('/user', newUser);
    }

}