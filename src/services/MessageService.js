// src/services/MessageService.js
import axios from "axios";
import UserService from "./UserService";

export default {
    sendGetUserMessagesRequest() {
        return axios.get('/messages', {
            params: {
                userId: UserService.getCurrentUserId()
            }
        });
    },

    sendGetUnreadMessagesRequest() {
        return axios.get('/messages/unread', {
            params: {
                userId: UserService.getCurrentUserId()
            }
        });
    },

    sendGetUnreadMessageCountRequest() {
        return axios.get('/messages/unread/count', {
            params: {
                userId: UserService.getCurrentUserId()
            }
        });
    },

    sendMarkMessageAsReadRequest(messageId) {
        return axios.patch('/message/' + messageId + '/read', null, {
            params: {
                userId: UserService.getCurrentUserId()
            }
        });
    }
}