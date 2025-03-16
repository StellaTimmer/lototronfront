<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')">

    <template #title>
      Muuda lõuna
    </template>

    <template #body>
      <AlertSuccess :message="successMessage"/>
      <AlertDanger :message="errorMessage"/>

      <div class="event-summary p-3 mb-3 bg-light rounded">
        <h6>Muudetava lõuna andmed:</h6>
        <p class="mb-1"><strong>Restoran:</strong> {{ lunchEvent.restaurantName }}</p>
        <p class="mb-1"><strong>Kuupäev:</strong> {{ formatDate(lunchEvent.date) }}</p>
        <p class="mb-1"><strong>Aeg:</strong> {{ lunchEvent.time }}</p>
        <p class="mb-0"><strong>Osalejate arv:</strong> {{ lunchEvent.paxTotal }} ({{ lunchEvent.paxAvailable }} vaba)</p>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <span class="input-group-text mb-2">Kuupäev</span>
            <MonthCalendar
                :selected-date="editedLunchEvent.date"
                @event-date-selected="handleMonthCalendarDateSelected"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="input-group mb-3">
            <span class="input-group-text">Restoran</span>
            <select class="form-select"
                    :value="editedLunchEvent.restaurantId"
                    @change="handleRestaurantChange">
              <option selected :value="0">Vali restoran</option>
              <option v-for="restaurant in restaurants"
                      :key="restaurant.id"
                      :value="restaurant.id">
                {{restaurant.name}}
              </option>
            </select>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Osalejate arv</span>
            <input type="number"
                   class="form-control"
                   min="2"
                   :value="editedLunchEvent.paxTotal"
                   @input="handlePaxTotalChange">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Aeg</span>
            <select class="form-select"
                    :value="editedLunchEvent.time"
                    @change="handleTimeChange">
              <option selected value="">Vali aeg</option>
              <option v-for="time in availableTimes"
                      :key="time"
                      :value="time"
                      :disabled="isTimeConflict(time)">
                {{time}}
              </option>
            </select>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="updateLunch" type="button" class="btn btn-outline-success">Muuda</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import MonthCalendar from "@/components/lunchevent/MonthCalendar.vue";
import LunchEventService from "@/services/LunchEventService";

export default {
  name: 'EditLunchModal',
  components: {Modal, AlertSuccess, AlertDanger, MonthCalendar},
  props: {
    modalIsOpen: Boolean,
    lunchEventId: Number,
    lunchEvent: Object,
    restaurants: {
      type: Array,
      default: () => []
    },
    existingLunchTimes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      isOkToUpdateLunch: false,
      editedLunchEvent: {
        restaurantId: 0,
        paxTotal: 2,
        date: '',
        time: ''
      }
    }
  },
  computed: {
    availableTimes() {
      const times = [];
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          if (hour === 18 && minute > 0) continue;

          const formattedHour = String(hour).padStart(2, '0');
          const formattedMinute = String(minute).padStart(2, '0');
          times.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return times;
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('et-EE');
    },

    setEditedLunchEventData() {
      if (this.lunchEvent && Object.keys(this.lunchEvent).length > 0) {
        this.editedLunchEvent.restaurantId = this.lunchEvent.restaurantId;
        this.editedLunchEvent.paxTotal = this.lunchEvent.paxTotal;
        this.editedLunchEvent.date = this.lunchEvent.date;
        this.editedLunchEvent.time = this.lunchEvent.time ? this.lunchEvent.time.substring(0, 5) : '';
      }
    },

    handleMonthCalendarDateSelected(date) {
      this.editedLunchEvent.date = date;

      if (this.editedLunchEvent.date) {
        this.$emit('event-date-changed', this.editedLunchEvent.date);
      }
    },

    handleRestaurantChange(event) {
      this.editedLunchEvent.restaurantId = Number(event.target.value);
    },

    handlePaxTotalChange(event) {
      this.editedLunchEvent.paxTotal = Number(event.target.value);
    },

    handleTimeChange(event) {
      this.editedLunchEvent.time = event.target.value;
    },

    isTimeConflict(time) {
      if (!this.existingLunchTimes.length) return false;

      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;

      return this.existingLunchTimes.some(existingTime => {
        if (existingTime === this.lunchEvent.time) return false;

        const [existingHours, existingMinutes] = existingTime.split(':').map(Number);
        const existingTimeInMinutes = existingHours * 60 + existingMinutes;

        const timeDifference = Math.abs(timeInMinutes - existingTimeInMinutes);
        return timeDifference < 60;
      });
    },

    updateLunch() {
      this.validateIsOkToUpdateLunch();
      if (this.isOkToUpdateLunch) {
        this.resetIsOkToUpdateLunch();

        const updatedLunchEvent = {
          restaurantId: this.editedLunchEvent.restaurantId || this.lunchEvent.restaurantId,
          paxTotal: this.editedLunchEvent.paxTotal || this.lunchEvent.paxTotal,
          date: this.editedLunchEvent.date || this.lunchEvent.date,
          time: (this.editedLunchEvent.time || this.lunchEvent.time) + (this.editedLunchEvent.time && !this.editedLunchEvent.time.includes(':00') ? ':00' : '')
        };

        LunchEventService.sendPutLunchEventRequest(this.lunchEventId, updatedLunchEvent)
            .then(() => this.handleUpdateLunchResponse())
            .catch(error => this.handleUpdateLunchErrorResponse(error))
      }
    },

    validateIsOkToUpdateLunch() {
      if (!this.lunchEvent.restaurantId && !this.editedLunchEvent.restaurantId) {
        this.errorMessage = 'Vali restoran';
        setTimeout(this.resetAllMessages, 4000);
      } else if (this.editedLunchEvent.paxTotal < 2 && this.lunchEvent.paxTotal < 2) {
        this.errorMessage = 'Osalejate arv peab olema vähemalt 2';
        setTimeout(this.resetAllMessages, 4000);
      } else {
        this.isOkToUpdateLunch = true;
      }
    },

    resetIsOkToUpdateLunch() {
      this.isOkToUpdateLunch = false;
    },

    handleUpdateLunchResponse() {
      this.successMessage = 'Lõuna on edukalt muudetud';
      setTimeout(() => {
        this.resetAllMessages();
        this.$emit('event-lunch-updated');
        this.$emit('event-close-modal');
      }, 2000);
    },

    handleUpdateLunchErrorResponse(error) {
      this.errorMessage = error.response?.data?.message || 'Viga lõuna muutmisel';
      setTimeout(this.resetAllMessages, 4000);
    },

    resetAllMessages() {
      this.successMessage = '';
      this.errorMessage = '';
    }
  },
  beforeMount() {
    this.setEditedLunchEventData();
  }
}
</script>

<style scoped>
:deep(.modal-container) {
  width: 800px;
  max-width: 95%;
}

.event-summary {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
}
</style>