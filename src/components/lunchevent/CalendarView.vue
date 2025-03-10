<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="prevMonth">Prev</button>
      <h2>{{ currentMonthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">Next</button>
    </div>

    <div class="calendar-grid">
      <div class="calendar-day" v-for="(day, index) in daysOfWeek" :key="index">{{ day }}</div>
      <div
          class="calendar-day"
          v-for="(day, index) in weekdaysInMonth"
          :key="index"
          @click="selectDate(day)"
          :class="getEventClass(day.date)"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: Array, // Expecting parent to pass events data
  },
  data() {
    // Set the current date to today by default
    const today = new Date();
    return {
      currentDate: today,
      selectedDate: today, // Automatically select today's date
    };
  },
  computed: {
    currentMonthName() {
      const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
      ];
      return months[this.currentDate.getMonth()];
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    daysOfWeek() {
      return ["Mon", "Tue", "Wed", "Thu", "Fri"]; // Only weekdays
    },
    weekdaysInMonth() {
      const startOfMonth = new Date(this.currentYear, this.currentDate.getMonth(), 1);
      const endOfMonth = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0);
      const days = [];

      // Loop through the month and add weekdays (Mon-Fri)
      for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentDate.getMonth(), i);
        // Only add weekdays (Mon to Fri)
        if (date.getDay() >= 1 && date.getDay() <= 5) { // Mon to Fri only
          days.push({ date: i, dayOfWeek: date.getDay() });
        }
      }
      return days;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.$emit("month-changed", this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.$emit("month-changed", this.currentDate);
    },
    selectDate(day) {
      const selectedDate = new Date(this.currentYear, this.currentDate.getMonth(), day.date);
      this.selectedDate = selectedDate; // Update selected date
      this.$emit("date-selected", selectedDate);  // Emit the selected date to the parent
    },
    getEventClass(date) {
      const event = this.events.find(event => event.date === date);
      if (!event) return '';
      if (event.status === 'available') return 'available';
      if (event.status === 'full') return 'full';
      return '';
    },
  },
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Only 5 columns for weekdays */
  gap: 10px;
  text-align: center;
}

.calendar-day {
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.calendar-day:hover {
  background-color: #f0f0f0;
}

button {
  padding: 5px 10px;
  font-size: 1.2rem;
  cursor: pointer;
}

.available {
  background-color: green;
  color: white;
}

.full {
  background-color: red;
  color: white;
}
</style>
