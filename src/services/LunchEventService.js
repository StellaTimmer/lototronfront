import axios from "axios";

export default {

    sendPostLunchEventRequest(lunchEventDto) {
        return axios.post('/lunch-event', lunchEventDto);
    },

    sendGetLunchEventsByDateRequest(date) {
        return axios.get('/lunch-events-by-date', {
            params: {
                nowDate: date
            }
        });
    },

    sendGetLunchEventsByMonthRequest(year, month) {
         const yearMonthStr = `${year}-${String(month).padStart(2, '0')}`;

         return axios.get('/lunch-events-by-month', {
            params: {
                yearMonth: yearMonthStr
            }
        });
    },

    sendGetUserLunchEvents(userId) {
        return axios.get('/user-added-events', {
            params: {
                userId
            }
        })
    },

    sendPostJoinLunchEventRequest(lunchEventId, userId) {
        return axios.post('/lunch-event/join', {
            lunchEventId: lunchEventId,
            userId: userId
        });
    },

    sendGetAvailableLunchEvents() {
        return axios.get('/lunch-events');
    },

    sendGetUserJoinedEvents(userId) {
        return axios.get('/user-joined-events', {
            params: {
                userId
            }
        });
    },

    sendGetUserEventRegistration(lunchEventId, userId) {
        return axios.get('/lunch-events/check-registration', {
            params: {
                lunchEventId,
                userId
            }
        })
    },


}