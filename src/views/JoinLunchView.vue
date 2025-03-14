<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2>Vali kuupäev</h2>
          <MonthCalendar
              :selected-date="selectedDate"
              :days-with-lunches="daysWithLunches"
              @event-date-selected="setSelectedDate"
              @event-month-changed="handleMonthChanged"
          />
        </div>
        <div class="col-6">
          <h2>Saadaval lõunad</h2>
          <AlertSuccess :message="successMessage"/>
          <AlertDanger :message="errorMessage"/>
          <AvailableLunches
              :available-lunches="availableLunches"
              @event-join-lunch="joinLunch"
          />
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <h2>Minu lõunad</h2>
          <MyLunches
              :upcoming-created-lunches="upcomingCreatedLunches"
              :past-created-lunches="pastCreatedLunches"
              :upcoming-joined-lunches="upcomingJoinedLunches"
              :past-joined-lunches="pastJoinedLunches"
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
import MyLunches from "@/components/lunchevent/MyLunches.vue";
import AvailableLunches from "@/components/lunchevent/AvailableLunches.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import LunchEventService from "@/services/LunchEventService";
import NavigationService from "@/services/NavigationService";
import NavBar from "@/components/navbar/NavBar.vue";

export default {
  name: 'JoinLunchView',
  components: {NavBar, AlertDanger, AlertSuccess, AvailableLunches, MyLunches, MonthCalendar},
  data() {
    return {
      userId: Number(sessionStorage.getItem("userId")),
      selectedLunchEventId: 0,
      selectedDate: '',
      availableLunches: [],
      upcomingCreatedLunches: [],
      pastCreatedLunches: [],
      upcomingJoinedLunches: [],
      pastJoinedLunches: [],
      successMessage: '',
      errorMessage: '',
      daysWithLunches: [],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1
    }
  },

  methods: {
    setSelectedDate(date) {
      this.selectedDate = date
      if (date) {
        this.getAvailableLunches(date)
      }
    },

    handleMonthChanged(data) {
      this.currentYear = data.year;
      this.currentMonth = data.month;
      this.getWorkdayCalendar();
    },

    getWorkdayCalendar() {
      LunchEventService.sendGetWorkdayCalendarRequest(this.currentYear, this.currentMonth)
          .then(response => this.handleGetWorkdayCalendarResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetWorkdayCalendarResponse(response) {
      this.daysWithLunches = response.data.workdays
          .filter(day => day.hasAvailableLunches)
          .map(day => day.date);
    },

    getAvailableLunches(date) {
      LunchEventService.sendGetAvailableLunchesRequest(date)
          .then(response => this.handleGetAvailableLunchesResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetAvailableLunchesResponse(response) {
      this.availableLunches = response.data
    },

    getMyLunches() {
      Promise.all([
        LunchEventService.sendGetUpcomingCreatedLunchesRequest(),
        LunchEventService.sendGetPastCreatedLunchesRequest(),
        LunchEventService.sendGetUpcomingJoinedLunchesRequest(),
        LunchEventService.sendGetPastJoinedLunchesRequest()
      ])
          .then(([upcomingCreatedResponse, pastCreatedResponse, upcomingJoinedResponse, pastJoinedResponse]) => {
            this.upcomingCreatedLunches = upcomingCreatedResponse.data;
            this.pastCreatedLunches = pastCreatedResponse.data;
            this.upcomingJoinedLunches = upcomingJoinedResponse.data;
            this.pastJoinedLunches = pastJoinedResponse.data;
          })
          .catch(() => NavigationService.navigateToErrorView());
    },

    joinLunch(lunchEventId) {
      this.selectedLunchEventId = lunchEventId
      LunchEventService.sendPostJoinLunchRequest(lunchEventId)
          .then(() => this.handleJoinLunchResponse())
          .catch(error => this.handleJoinLunchErrorResponse(error))
    },

    handleJoinLunchResponse() {
      // TODO: sendPostSystemMessage POST /system-message kaasa kui RequestParam userId, lunchEventId
      // TODO: system S, new N, subject ja body backendus
      // TODO:
      // TODO:
      this.successMessage = 'Oled edukalt lõunaga liitunud'
      setTimeout(this.resetAllMessages, 4000)
      this.getAvailableLunches(this.selectedDate)
      this.getMyLunches()
    },

    handleJoinLunchErrorResponse(error) {
      this.errorMessage = error.response?.data?.message || 'Viga lõunaga liitumisel'
      setTimeout(this.resetAllMessages, 4000)
    },

    leaveLunch(lunchId) {
      LunchEventService.sendDeleteJoinedLunchRequest(lunchId)
          .then(() => {
            this.successMessage = 'Oled lõunast loobunud'
            setTimeout(this.resetAllMessages, 4000)
            this.getMyLunches()
            if (this.selectedDate) {
              this.getAvailableLunches(this.selectedDate)
            }
          })
          .catch(error => {
            this.errorMessage = error.response?.data?.message || 'Viga lõunast loobumisel'
            setTimeout(this.resetAllMessages, 4000)
          })
    },

    cancelLunch(lunchId) {
      LunchEventService.sendDeleteLunchEventRequest(lunchId)
          .then(() => {
            this.successMessage = 'Lõuna on tühistatud'
            setTimeout(this.resetAllMessages, 4000)
            this.getMyLunches()
            if (this.selectedDate) {
              this.getAvailableLunches(this.selectedDate)
            }
          })
          .catch(error => {
            this.errorMessage = error.response?.data?.message || 'Viga lõuna tühistamisel'
            setTimeout(this.resetAllMessages, 4000)
          })
    },

    resetAllMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    }
  },
  beforeMount() {
    this.getMyLunches()
    this.getWorkdayCalendar()
  }
}
</script>