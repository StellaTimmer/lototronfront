<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2>Vali kuupäev</h2>
          <MonthCalendar
              :selected-date="lunchEvent.date"
              @event-date-selected="setLunchEventDate"
          />
        </div>
        <div class="col-6">
          <h2>Lisa lõuna</h2>
          <LunchForm
              :lunch-event="lunchEvent"
              :restaurants="restaurants"
              :error-message="errorMessage"
              :success-message="successMessage"
              :existing-lunch-times="existingLunchTimes"
              @event-update-restaurant="setLunchEventRestaurant"
              @event-update-pax-total="setLunchEventPaxTotal"
              @event-update-time="setLunchEventTime"
              @event-add-lunch="addNewLunchEvent"
              @event-navigate-back="navigateToLunchesView"
          />
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <h2>Minu lõunad</h2>
          <MyLunches
              :upcoming-lunches="upcomingLunches"
              :past-lunches="pastLunches"
              @event-cancel-lunch="cancelLunch"
              @event-leave-lunch="leaveLunch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MonthCalendar from "@/components/lunchevent/MonthCalendar.vue";
import LunchForm from "@/components/lunchevent/LunchForm.vue";
import MyLunches from "@/components/lunchevent/MyLunches.vue";
import RestaurantService from "@/services/RestaurantService";
import LunchEventService from "@/services/LunchEventService";
import NavigationService from "@/services/NavigationService";
import NavBar from "@/components/navbar/NavBar.vue";
import Banner from "@/components/navbar/Banner.vue";

export default {
  name: 'CreateLunchView',
  components: {MonthCalendar,Banner, NavBar, LunchForm, MyLunches},

  data() {
    return {
      successMessage: '',
      errorMessage: '',
      isOkToAddNewLunch: false,
      restaurants: [],
      lunchEvent: {
        restaurantId: 0,
        paxTotal: 2,
        date: '',
        time: ''
      },
      upcomingLunches: [],
      pastLunches: [],
      existingLunchTimes: []
    }
  },
  methods: {
    setLunchEventDate(date) {
      this.lunchEvent.date = date
      if (date) {
        this.getExistingLunchTimes(date)
      }
    },

    setLunchEventRestaurant(restaurantId) {
      this.lunchEvent.restaurantId = restaurantId
    },

    setLunchEventPaxTotal(paxTotal) {
      this.lunchEvent.paxTotal = paxTotal
    },

    setLunchEventTime(time) {
      this.lunchEvent.time = time
    },

    getRestaurants() {
      RestaurantService.sendGetRestaurantsRequest()
          .then(response => this.handleGetRestaurantsResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetRestaurantsResponse(response) {
      this.restaurants = response.data
    },

    getMyLunches() {
      Promise.all([
        LunchEventService.sendGetUpcomingCreatedLunchesRequest(),
        LunchEventService.sendGetPastCreatedLunchesRequest()
      ])
          .then(([upcomingResponse, pastResponse]) => {
            this.upcomingLunches = upcomingResponse.data
            this.pastLunches = pastResponse.data
          })
          .catch(() => NavigationService.navigateToErrorView())
    },

    getExistingLunchTimes(date) {
      LunchEventService.sendGetUserLunchesByDateRequest(date)
          .then(response => {
            this.existingLunchTimes = response.data.map(lunch => lunch.time)
          })
          .catch(() => {
            this.existingLunchTimes = []
          })
    },

    navigateToLunchesView() {
      NavigationService.navigateToLunchesView()
    },

    addNewLunchEvent() {
      this.validateIsOkToAddNewLunch()
      if (this.isOkToAddNewLunch) {
        this.resetIsOkToAddNewLunch();

        const formattedLunchEvent = {
          ...this.lunchEvent,
          time: this.lunchEvent.time + ':00'
        };

        LunchEventService.sendPostLunchEventRequest(formattedLunchEvent)
            .then(response => this.handleAddNewLunchEventResponse(response))
            .catch(error => this.handleAddNewLunchEventErrorResponse(error))
      }
    },

    handleAddNewLunchEventResponse() {
      this.successMessage = 'Lõunasündmus lisatud'
      setTimeout(this.resetAllMessages, 4000)
      this.resetAllFields()
      this.getMyLunches()
    },

    handleAddNewLunchEventErrorResponse(error) {
      this.errorMessage = error.response?.data?.message || 'Viga lõunasündmuse lisamisel'
      setTimeout(this.resetAllMessages, 4000)
    },

    validateIsOkToAddNewLunch() {
      if (this.lunchEvent.restaurantId === 0) {
        this.errorMessage = 'Vali restoran'
        setTimeout(this.resetAllMessages, 4000)
      } else if (this.lunchEvent.date.length === 0) {
        this.errorMessage = 'Vali kuupäev'
        setTimeout(this.resetAllMessages, 4000)
      } else if (this.lunchEvent.time.length === 0) {
        this.errorMessage = 'Vali aeg'
        setTimeout(this.resetAllMessages, 4000)
      } else if (this.lunchEvent.paxTotal < 2) {
        this.errorMessage = 'Osalejate arv peab olema vähemalt 2'
        setTimeout(this.resetAllMessages, 4000)
      } else {
        this.isOkToAddNewLunch = true
      }
    },

    resetIsOkToAddNewLunch() {
      this.isOkToAddNewLunch = false
    },

    resetAllFields() {
      this.lunchEvent.restaurantId = 0
      this.lunchEvent.paxTotal = 2
      this.lunchEvent.date = ''
      this.lunchEvent.time = ''
    },

    resetAllMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

    cancelLunch(lunchId) {
      LunchEventService.sendDeleteLunchEventRequest(lunchId)
          .then(() => {
            this.successMessage = 'Lõuna on tühistatud';
            setTimeout(this.resetAllMessages, 4000);
            this.getMyLunches(); // Refresh the lists
          })
          .catch(error => {
            this.errorMessage = error.response?.data?.message || 'Viga lõuna tühistamisel';
            setTimeout(this.resetAllMessages, 4000);
          });
    },

    leaveLunch(lunchId) {
      LunchEventService.sendDeleteJoinedLunchRequest(lunchId)
          .then(() => {
            this.successMessage = 'Oled lõunast loobunud';
            setTimeout(this.resetAllMessages, 4000);
            this.getMyLunches(); // Refresh the lists
          })
          .catch(error => {
            this.errorMessage = error.response?.data?.message || 'Viga lõunast loobumisel';
            setTimeout(this.resetAllMessages, 4000);
          });
    }
  },
  beforeMount() {
    this.getRestaurants()
    this.getMyLunches()
  }
}
</script>
`