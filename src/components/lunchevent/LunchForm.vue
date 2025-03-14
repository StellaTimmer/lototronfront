<template>
  <div>
    <AlertSuccess :message="successMessage"/>
    <AlertDanger :message="errorMessage"/>

    <div class="input-group mb-3">
      <span class="input-group-text">Restoran</span>
      <select class="form-select"
              :value="lunchEvent.restaurantId"
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
             :value="lunchEvent.paxTotal"
             @input="handlePaxTotalChange">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Aeg</span>
      <select class="form-select"
              :value="lunchEvent.time"
              @change="handleTimeChange"
              :disabled="!lunchEvent.date">
        <option selected value="">Vali aeg</option>
        <option v-for="time in availableTimes"
                :key="time"
                :value="time"
                :disabled="isTimeConflict(time)">
          {{time}}
        </option>
      </select>
    </div>

    <div class="mt-4">
      <button @click="$emit('event-navigate-back')" type="button" class="btn btn-outline-dark me-3">Tagasi</button>
      <button @click="$emit('event-add-lunch')" type="button" class="btn btn-outline-warning">Lisa</button>
    </div>
  </div>
</template>

<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'LunchForm',
  components: {AlertDanger, AlertSuccess},
  props: {
    lunchEvent: {
      type: Object,
      required: true
    },
    restaurants: {
      type: Array,
      default: () => []
    },
    successMessage: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    existingLunchTimes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    availableTimes() {
      // Generate time slots at 15-minute intervals (8:00 to 18:00)
      const times = [];
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          if (hour === 18 && minute > 0) continue; // Don't go past 18:00

          const formattedHour = String(hour).padStart(2, '0');
          const formattedMinute = String(minute).padStart(2, '0');
          times.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return times;
    }
  },
  methods: {
    handleRestaurantChange(event) {
      this.$emit('event-update-restaurant', Number(event.target.value));
    },

    handlePaxTotalChange(event) {
      this.$emit('event-update-pax-total', Number(event.target.value));
    },

    handleTimeChange(event) {
      this.$emit('event-update-time', event.target.value);
    },

    isTimeConflict(time) {
      // Check if the time conflicts with existing lunch times (within 60 minutes)
      if (!this.existingLunchTimes.length) return false;

      // Convert time to minutes for easier comparison
      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;

      // Check against each existing time
      return this.existingLunchTimes.some(existingTime => {
        const [existingHours, existingMinutes] = existingTime.split(':').map(Number);
        const existingTimeInMinutes = existingHours * 60 + existingMinutes;

        // Check if within 60 minutes (before or after)
        const timeDifference = Math.abs(timeInMinutes - existingTimeInMinutes);
        return timeDifference < 60;
      });
    }
  }
}
</script>