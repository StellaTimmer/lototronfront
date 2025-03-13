<template>
  <div class="calendar-container">
<!--     Kuu ja aastavaade ja navigatsiooniga -->
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

  //arvutab uuesti määratletud atribuudid kui nende sõltuvused muutuvad
  computed: {
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

    startingDayOffset() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return this.convertToMondayBased(firstDay);
    },

    weekdaysInMonth() {
      const days = [];
      const daysInMonth = this.getDaysInMonth();

      for (let i = 1; i <= daysInMonth; i++) {
        if (this.isWeekday(i)) {days.push(this.createDayObject(i));}
      }
      return days;
    }
  },

  //
  watch: {

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

    //make it pretty
    hasLunchEvents(date) {
      const dateStr = this.formatDate(date);

      return this.events.some(event => {
        let eventDate;
        if (typeof event.date === 'object') {
          eventDate = this.formatDate(event.date);
        } else {
          if (typeof event.date === 'number') {
            eventDate = this.formatDate(new Date(this.currentYear, this.currentMonth, event.date));
          } else {
            eventDate = event.date;
          }
        }

        return eventDate === dateStr && event.status === 'available';
      });
    },

    isSelectedDate(date) {
      return this.formatDate(date) === this.formatDate(this.internalSelectedDate);
    },

    isToday(date) {
      return this.formatDate(date) === this.formatDate(this.today);
    },

    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    convertToMondayBased(day) {
      if (day === 0) {
        return 5;
      } else {
        return day - 1;
      }
    },

    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },

    isWeekday(dayOfMonth) {
      const date = new Date(this.currentYear, this.currentMonth, dayOfMonth);
      const dayOfWeek = date.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    },

    createDayObject(dayOfMonth) {
      const date = new Date(this.currentYear, this.currentMonth, dayOfMonth);
      return {
        date: dayOfMonth,
        dayOfWeek: date.getDay(),
        fullDate: new Date(date)
      };
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