import axios from "axios";

export default {
    sendGetRestaurantsRequest() {
        return axios.get('/restaurants');
    },


}