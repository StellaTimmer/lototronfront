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
            <TimeSelector style="margin-bottom: 150px;"
                          :time="lunchEventDto.time"
                          @update:time="updateTime"
            />
            <div>
              <h3>Lõunatajate arv:</h3>
              <AttendanceSelector :initial-count="lunchEventDto.paxTotal"
                                  @attendance-updated="handleAttendanceUpdate"
              />
            </div>
          </div>

          <div>
            <button @click="addNewLunchEvent" type="submit" class="btn btn-warning" style="margin-top: 100px">KINNITA LÕUNA</button>
          </div>

        </div>



        <div class="col">
          <div class="card-header">
            <h4>Sinu lõunad</h4>
          </div>
          <div style="margin-bottom: 80px;"> Tulemas:</div>
<!--          <div class="card-body">-->
<!--            <ul class="nav nav-tabs" id="myTab" role="tablist">-->
<!--              <li class="nav-item" role="presentation">-->
<!--                <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab"-->
<!--                        data-bs-target="#upcoming-tab-pane" type="button" role="tab"-->
<!--                        aria-controls="upcoming-tab-pane" aria-selected="true">-->
<!--&lt;!&ndash;                  Tulemas&ndash;&gt;-->
<!--                </button>-->
<!--              </li>-->
<!--              <li class="nav-item" role="presentation">-->
<!--                <button class="nav-link" id="past-tab" data-bs-toggle="tab"-->
<!--                        data-bs-target="#past-tab-pane" type="button" role="tab"-->
<!--                        aria-controls="past-tab-pane" aria-selected="false">-->
<!--&lt;!&ndash;                  Möödunud&ndash;&gt;-->
<!--                </button>-->
<!--              </li>-->
<!--            </ul>-->

<!--            <div class="tab-content pt-3" id="myTabContent">-->
<!--              &lt;!&ndash;Tulemas evendid&ndash;&gt;-->
<!--              <div class="tab-pane fade show active" id="upcoming-tab-pane" role="tabpanel"-->
<!--                   aria-labelledby="upcoming-tab" tabindex="0">-->
<!--                <p v-if="upcomingMyEvents.length === 0" class="text-muted">Sul pole tulevaid lõunaid.</p>-->
<!--                <ul v-else class="list-group">-->
<!--                  <li v-for="event in upcomingMyEvents" :key="event.id"-->
<!--                      class="list-group-item d-flex justify-content-between align-items-center">-->
<!--                    <div>-->
<!--                      <strong>{{ formatDateDisplayToEstonian(event.date) }}</strong> kell {{ event.time }}-->
<!--                      <br/>-->
<!--                      <span class="text-muted">{{ event.restaurantName }}</span>-->
<!--                    </div>-->
<!--                    <span class="badge bg-primary rounded-pill">{{ event.paxTotal }} inimest</span>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->



          <!--          <div>Möödunud:</div>-->

        </div>

      </div>


    </div>

  </div>


</template>


<script>
import RestaurantsDropdown from "@/components/restaurants/RestaurantsDropdown.vue";
import RestaurantService from "@/services/RestaurantService";
import NavigationService from "@/services/NavigationService";
import LunchEventService from "@/services/LunchEventService";
import DateSelector from "@/components/availability/DateSelector.vue";
import TimeSelector from "@/components/availability/TimeSelector.vue";
import AttendanceSelector from "@/components/attendanceselector/AttendanceSelector.vue";
import NavBar from "@/components/navbar/NavBar.vue";
import Banner from "@/components/navbar/Banner.vue";

export default {
  name: "CreateLunchView",
  components: {Banner, NavBar, AttendanceSelector, TimeSelector, DateSelector, RestaurantsDropdown},

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
      RestaurantService.sendGetRestaurantsRequest()
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


