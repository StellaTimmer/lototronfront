import axios from "axios";

export default {

    sendPostNewUserRequest(newUser) {
        return axios.post('/register', newUser);
    },

    getCurrentUserId() {

        return sessionStorage.getItem('userId') || 1;
    },

    isLoggedIn() {
        return sessionStorage.getItem('userId') !== null;
    },

    sendChangePasswordRequest(passwordChange) {
        return axios.patch('/user', passwordChange);
    }

}