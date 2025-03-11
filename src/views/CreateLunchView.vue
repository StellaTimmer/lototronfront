<template>

  <div>

    <div class="container text-center mt-5">

      <div class="row">

        <div><h1 class="mb-5">LOO LÕUNA:</h1></div>

        <div class="col">

          <DateSelector :date="lunchEventDto.date"
                        @update:date="updateDate"
          />

          <div><h3> Vali söögikoht: </h3></div>
          <RestaurantsDropdown :restaurants="restaurants"
                               :selected-restaurant-id="lunchEventDto.restaurantId"
                               @event-new-restaurant-selected="setLunchEventDtoRestaurantId"
          />

        </div>


        <div class="col">

          <div>

            <TimeSelector style="margin-bottom: 180px;"
                          :time="lunchEventDto.time"
                          @update:time="updateTime"
            />


            <div>
              <h3>Kui palju on lõunatajaid?</h3>
              <AttendanceSelector :initial-count="lunchEventDto.paxTotal"
                                  @attendance-updated="handleAttendanceUpdate"
              />
            </div>
          </div>

          <div>
            <button @click="addNewLunchEvent" type="submit" class="btn btn-warning btn-lg">KINNITA LÕUNA</button>
          </div>

        </div>

        <div class="col">

          <div style="margin-bottom: 100px;"><h5> Sinu lõunad: </h5></div>
          <div style="margin-bottom: 80px;"> Tulemas:</div>
          <div>Möödunud:</div>

        </div>

        <div class="col">
          Siia tulevad reklaamid
        </div>

        <div/>
      </div>


    </div>

  </div>


</template>


<script>
import RestaurantsDropdown from "@/components/restaurants/RestaurantsDropdown.vue";
import SelectedRestaurantService from "@/services/RestaurantService";
import NavigationService from "@/services/NavigationService";
import LunchEventService from "@/services/LunchEventService";
import DateSelector from "@/components/availability/DateSelector.vue";
import TimeSelector from "@/components/availability/TimeSelector.vue";
import AttendanceSelector from "@/components/attendanceselector/AttendanceSelector.vue";

export default {
  name: "CreateLunchView",
  components: {AttendanceSelector, TimeSelector, DateSelector, RestaurantsDropdown},

  data() {
    return {
      selectedRestaurantId: 0,
      minDate: '',  // Minimum allowable date
      maxDate: '',  // Maximum allowable date
      restaurants: [
        {
          restaurantId: 0,
          restaurantName: ''
        }
      ],
      isOkToCreateNewLunchEvent: false,
      lunchEventDto: {
        userId: 0,
        restaurantId: 0,
        paxTotal: 0,
        paxAvailable: 0,
        date: '',
        time: ''
      },
    };
  },
  methods: {

    handleAttendanceUpdate(data) {
      this.lunchEventDto.paxTotal = data.paxTotal
      this.lunchEventDto.paxAvailable = data.paxAvailable

    },

    addNewLunchEvent() {
      LunchEventService.sendPostLunchEventRequest(this.lunchEventDto)
      // .then(response => {
      //   this.someDataBlockResponseObject = response.data
      // })
      // .catch(error => {
      //   this.someDataBlockErrorResponseObject = error.response.data
      // })
    },

    getUserIdFromSession() {
      const userId = sessionStorage.getItem('userId');
      return userId ? JSON.parse(userId) : 0;
    },

//      TODO: dellega saadame kaasa:
//     lunchEventDto: {
//         Validations???

    setLunchEventDtoRestaurantId(selectedRestaurantId) {
      this.lunchEventDto.restaurantId = selectedRestaurantId
    },

    updateDate(newDate) {
      this.lunchEventDto.date = newDate;
    },

    getRestaurants() {
      SelectedRestaurantService.sendGetRestaurantsRequest()
          .then(response => this.handleGetRestaurantsResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    updateTime(newTime) {
      this.lunchEventDto.time = newTime;
    },

    handleGetRestaurantsResponse(response) {
      this.restaurants = response.data
    },

    allFieldsAreWithInput() {
      //TODO:  Suts ridu, et vaadata, kas date + time + resto + id + paxud on olemas
      return true;
    },

    alertMissingFields() {
      //TODO:  nats meetodit siia ka
    },

  },

  beforeMount() {
    this.lunchEventDto.userId = this.getUserIdFromSession();
    this.getRestaurants();

  }
}


</script>


