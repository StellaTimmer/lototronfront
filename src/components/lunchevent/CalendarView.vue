<template>
  <div class="calendar-container">
<!--     Kalendri vaade kuu, aasta ja navigatsiooniga -->
    <div class="calendar-header d-flex justify-content-between align-items-center mb-3">
      <button class="action-button yellow" @click="prevMonth">
        <font-awesome-icon icon="chevron-left" />
      </button>
      <h3>{{ currentMonthNameInEstonian }} {{ currentYear }}</h3>
      <button class="action-button yellow" @click="nextMonth">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>

<!--    Nädalapäevad esmaspäevast reedeni-->
    <div class="weekday-labels d-flex justify-content-between mb-2">
      <div v-for="day in weekdayLabels" :key="day" class="weekday-label text-center">
        {{ day }}
      </div>
    </div>

    <!-- Kalendri kastid -->
    <div class="calendar-grid">
      <!-- tühjad kastid -->
      <div
          v-for="n in startingDayOffset"
          :key="`empty-${n}`"
          class="calendar-day empty"
      ></div>

      <!-- tööpäevad kuus -->
      <div
          v-for="day in weekdaysInMonth"
          :key="`day-${day.date}`"
          :class="[
          'calendar-day',
          { 'has-events': hasLunchEvents(day.fullDate) },
          { 'no-events': !hasLunchEvents(day.fullDate) },
          { 'selected': isSelectedDate(day.fullDate) },
          { 'current-day': isToday(day.fullDate) }
        ]"
          @click="selectDate(day.fullDate)"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',
  props: {
    events: {
      type: Array,
      default: () => []
    },
    selectedDate: {
      type: Date,
      default: null
    }
  },

  data() {
    return {
      currentDate: new Date(),
      internalSelectedDate: this.selectedDate || new Date(),
      weekdayLabels: ['E', 'T', 'K', 'N', 'R'],
      today: new Date()
    };
  },

  computed: {  //arvutab uuesti määratletud atribuudid kui nende sõltuvused muutuvad
    currentYear() {
      return this.currentDate.getFullYear();
    },

    currentMonth() {
      return this.currentDate.getMonth();
    },

    currentMonthNameInEstonian() {
      return new Date(this.currentYear, this.currentMonth, 1)
          .toLocaleString('et-EE', { month: 'long' });
    },

    // Calculate the starting day offset (how many empty cells before the first day)
    startingDayOffset() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      // Converting from Sunday-based (0-6) to Monday-based (0-4) for weekdays only
      // If Sunday (0), return 5, else adjust by 1 (Monday = 0, Tuesday = 1, etc.)
      return firstDay === 0 ? 5 : firstDay - 1;
    },

    // Get all weekdays (Mon-Fri) in the current month
    weekdaysInMonth() {
      const days = [];
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(this.currentYear, this.currentMonth, i);
        const dayOfWeek = date.getDay();

        // Only include weekdays (Monday-Friday: 1-5)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          days.push({
            date: i,
            dayOfWeek: dayOfWeek,
            fullDate: new Date(date)
          });
        }
      }
      return days;
    }
  },

  watch: {
    // Watch for external changes to the selected date
    selectedDate(newDate) {
      if (newDate) {
        this.internalSelectedDate = new Date(newDate);
      }
    }
  },
  methods: {
    prevMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.currentDate = newDate;
      this.$emit('month-changed', newDate);
    },

    nextMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.currentDate = newDate;
      this.$emit('month-changed', newDate);
    },

    selectDate(date) {
      this.internalSelectedDate = date;
      this.$emit('date-selected', date);
    },

    // Check if a date has lunch events
    hasLunchEvents(date) {
      const dateStr = this.formatDate(date);

      // Check events array for matching date with available status
      return this.events.some(event => {
        // If event.date is a date object, format it first
        const eventDate = typeof event.date === 'object'
            ? this.formatDate(event.date)
            : (typeof event.date === 'number'
                ? this.formatDate(new Date(this.currentYear, this.currentMonth, event.date))
                : event.date);

        return eventDate === dateStr && event.status === 'available';
      });
    },

    // Check if a date is the currently selected date
    isSelectedDate(date) {
      return this.formatDate(date) === this.formatDate(this.internalSelectedDate);
    },

    // Check if a date is today
    isToday(date) {
      return this.formatDate(date) === this.formatDate(this.today);
    },

    // Format date to YYYY-MM-DD for comparison
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped>
.calendar-container {
  max-width: 100%;
  margin: 0 auto;
}

.calendar-header h3 {
  margin: 0;
  text-transform: capitalize;
}

.weekday-labels {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.weekday-label {
  font-weight: bold;
  padding: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.calendar-day {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;
}

.calendar-day:hover {
  background-color: #f8f9fa;
  transform: scale(1.05);
}

.calendar-day.empty {
  background: none;
  border: none;
  cursor: default;
}

.calendar-day.has-events {
  background-color: #d4edda; /* Light green for days with events */
  color: #155724;
}

.calendar-day.no-events {
  background-color: #f8f9fa; /* Light gray for days without events */
}

.calendar-day.selected {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.calendar-day.current-day {
  border: 2px solid #ffc107; /* Yellow border for today */
}

/* When a day is both selected and has events */
.calendar-day.has-events.selected {
  background-color: #28a745; /* Darker green */
  color: white;
}

/* Incorporate your application's button styling */
.action-button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-button.yellow {
  background-color: #f8da71;
  color: #131317;
}

.action-button.yellow:hover {
  background-color: #e2c04f;
}
</style>