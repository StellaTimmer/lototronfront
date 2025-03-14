<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button class="btn btn-outline-warning" @click="previousMonth">&lt;</button>
      <h3>{{ currentMonthName }} {{ currentYear }}</h3>
      <button class="btn btn-outline-warning" @click="nextMonth">&gt;</button>
    </div>

    <div class="weekdays">
      <div v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>

    <div class="days">
      <div
          v-for="day in calendarDays"
          :key="day.date"
          :class="[
          'day',
          { 'non-workday': !day.isWorkday },
          { 'non-current-month': !day.isCurrentMonth },
          { 'selected': day.date === selectedDate },
          { 'today': day.isToday },
          { 'has-lunches': hasAvailableLunches(day.date) }
        ]"
          @click="day.isCurrentMonth ? selectDate(day) : null"
      >
        {{ day.dayNumber }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthCalendar',
  props: {
    selectedDate: {
      type: String,
      default: ''
    },
    daysWithLunches: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekdays: ['E', 'T', 'K', 'N', 'R']
    }
  },
  computed: {
    currentMonthName() {
      const monthNames = [
        'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
        'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'
      ];
      return monthNames[this.currentMonth];
    },

    calendarDays() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

      let startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - this.getWeekdayIndex(firstDay.getDay()));

      let endDate = new Date(lastDay);
      endDate.setDate(lastDay.getDate() + (6 - this.getWeekdayIndex(lastDay.getDay())));

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        const isWorkday = dayOfWeek > 0 && dayOfWeek < 6; // 1-5 (Mon-Fri)
        const isCurrentMonth = currentDate.getMonth() === this.currentMonth;

        if (isWorkday) {
          const formattedDate = this.formatDate(currentDate);
          const today = new Date();
          const isToday = currentDate.getDate() === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

          days.push({
            date: formattedDate,
            dayNumber: currentDate.getDate(),
            isWorkday: true,
            isCurrentMonth: isCurrentMonth,
            isToday: isToday
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return days;
    }
  },
  methods: {
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.$emit('event-month-changed', { year: this.currentYear, month: this.currentMonth + 1 });
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.$emit('event-month-changed', { year: this.currentYear, month: this.currentMonth + 1 });
    },

    selectDate(day) {
      if (day.isWorkday && day.isCurrentMonth) {
        this.$emit('event-date-selected', day.date);
      }
    },

    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    getWeekdayIndex(day) {
      return day === 0 ? 6 : day - 1;
    },

    hasAvailableLunches(date) {
      return this.daysWithLunches.includes(date);
    }
  }
}
</script>

<style scoped>
.calendar-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns for Mon-Fri */
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background-color: #f8f9fa;
}

.days {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns for Mon-Fri */
  gap: 5px;
}

.day {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: white;
}

.day:hover {
  background-color: #f0f0f0;
}

.non-workday {
  background-color: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}

.non-current-month {
  opacity: 0.3;
  cursor: default !important;
  background-color: #f9f9f9;
  color: #999;
}

.non-current-month:hover {
  background-color: #f9f9f9 !important;
}

.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.today {
  font-weight: bold;
  border: 2px solid #007bff;
}

.has-lunches {
  background-color: #d4edda; /* Light green background */
  border-color: #c3e6cb;
  position: relative;
}

.has-lunches::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #28a745; /* Green dot indicator */
}

.has-lunches.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.has-lunches.selected::after {
  background-color: white;
}
</style>