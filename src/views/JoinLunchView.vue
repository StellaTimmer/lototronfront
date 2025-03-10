<template>
  <div class="container">
    <h1 class="text-center">Join Lunch Event</h1>

    <CalendarView
        :events="events"
        @date-selected="handleDateSelected"
        @month-changed="handleMonthChanged"
    />

    <LunchEventTable :selectedDate="selectedDate" />
  </div>
</template>

<script>

import LunchEventTable from "@/components/lunchevent/LunchEventTable.vue";
import CalendarView from "@/components/lunchevent/CalendarView.vue";

export default {
  components: {
    CalendarView,
    LunchEventTable
  },
  data() {
    return {
      events: [
        { date: 5, status: 'available' },
        { date: 12, status: 'full' },
        { date: 19, status: 'available' },
        { date: 26, status: 'none' },
      ], // Pass actual data later
      selectedDate: new Date(), // Default to today's date
    };
  },
  methods: {
    handleDateSelected(selectedDate) {
      this.selectedDate = selectedDate;
      console.log('Selected Date:', selectedDate);
    },
    handleMonthChanged(newDate) {
      console.log('Month changed:', newDate);
      // Optionally fetch new events for the selected month
    },
  },
};
</script>
