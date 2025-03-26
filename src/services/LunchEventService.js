import axios from "axios";
import UserService from "./UserService";

export default {
    sendPostLunchEventRequest(lunchEvent) {
        return axios.post('/lunch/event', lunchEvent, {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendGetAvailableLunchesRequest(date) {
        return axios.get('/lunch/events/available', {
                params: {
                    userId: UserService.getCurrentUserId(),
                    date: date
                }
            }
        );
    },

    sendGetUserLunchesByDateRequest(date) {
        return axios.get('/lunch/events/user-date', {
            params: {
                userId: UserService.getCurrentUserId(),
                date: date
            }
        });
    },

    sendGetWorkdayCalendarRequest(year, month) {
        return axios.get('/calendar', {
            params: {
                year: year,
                month: month
            }
        });
    },

    sendGetUpcomingCreatedLunchesRequest() {
        return axios.get('/lunch/events/upcoming/created', {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendGetPastCreatedLunchesRequest() {
        return axios.get('/lunch/events/past/created', {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendGetUpcomingJoinedLunchesRequest() {
        return axios.get('/lunch/events/upcoming/joined', {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendGetPastJoinedLunchesRequest() {
        return axios.get('/lunch/events/past/joined', {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendPutLunchEventRequest(lunchEventId, updatedLunchEvent) {
        return axios.put(`/lunch/event/${lunchEventId}`, updatedLunchEvent, {
            params: {
                userId: UserService.getCurrentUserId()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    sendDeleteLunchEventRequest(lunchEventId) {
        return axios.delete('/lunch/event/' + lunchEventId, {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendPostJoinLunchRequest(lunchEventId) {
        return axios.post('/lunch/event/' + lunchEventId + '/join', null, {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    },

    sendDeleteJoinedLunchRequest(lunchEventId) {
        return axios.delete('/lunch/event/' + lunchEventId + '/join', {
                params: {
                    userId: UserService.getCurrentUserId()
                }
            }
        );
    }
}