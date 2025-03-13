<template>
  <div class="lunch-events-container">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4>Lõunasündmused {{ formattedSelectedDate }}</h4>
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
      </div>
      <div v-if="selectedEvent" class="card-header bg-light border-top-0">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>Valitud:</strong> {{ selectedEvent.restaurantName }} kell {{ selectedEvent.time }}
          </div>
          <button class="action-button yellow" @click="confirmJoin">Kinnita liitumine</button>
        </div>
      </div>

      <div v-if="joinSuccess" class="alert alert-success mx-3 mt-3 mb-0">
        Oled edukalt liitunud lõunasündmusega!
      </div>

      <div class="card-body">
        <!-- No date selected message -->
        <p v-if="!selectedDate" class="text-center text-muted">
          Palun vali kuupäev kalendrist.
        </p>

        <!-- No events for selected date -->
        <p v-else-if="eventsForSelectedDate.length === 0" class="text-center text-muted">
          Sellel päeval pole lõunasündmusi.
        </p>

        <!-- Lunch events table -->
        <table v-else class="table table-hover">
          <thead>
          <tr>
            <th>Aeg</th>
            <th>Söögikoht</th>
            <th>Kokku</th>
            <th>Vabu kohti</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="event in eventsForSelectedDate"
              :key="event.id"
              :class="{ 'table-active': selectedEvent && selectedEvent.id === event.id }"
              @click="selectEvent(event)"
          >
            <td>{{ event.time }}</td>
            <td>{{ event.restaurantName }}</td>
            <td>{{ event.paxTotal }}</td>
            <td>{{ event.paxAvailable }}</td>
            <td>
              <button
                  class="action-button yellow"
                  :disabled="event.paxAvailable === 0"
                  @click.stop="joinEvent(event)"
              >
                Liitu
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LunchEventTable',
  props: {
    selectedDate: {
      type: Date,
      default: null
    },
    // This would be populated with real data in your application
    events: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedEvent: null,
      isLoading: false,
      joinSuccess: false
    };
  },
  computed: {
    formattedSelectedDate() {
      if (!this.selectedDate) return '';

      return this.selectedDate.toLocaleDateString('et-EE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    eventsForSelectedDate() {
      if (!this.selectedDate) return [];

      const formattedDate = this.formatDate(this.selectedDate);

      return [
        {
          id: 1,
          date: formattedDate,
          time: '12:00',
          restaurantName: 'Vapiano',
          paxTotal: 4,
          paxAvailable: 2
        },
        {
          id: 2,
          date: formattedDate,
          time: '13:00',
          restaurantName: 'Lendav Taldrik',
          paxTotal: 6,
          paxAvailable: 3
        },
        {
          id: 3,
          date: formattedDate,
          time: '12:30',
          restaurantName: 'Ülo Resto',
          paxTotal: 3,
          paxAvailable: 0 // Full event
        }
      ];
    }
  },
  watch: {
    selectedDate() {
      // Reset selection when date changes
      this.selectedEvent = null;
      this.joinSuccess = false;
      this.loadEvents();
    }
  },
  methods: {
    loadEvents() {
      // Simulate API call to load events for selected date
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },

    selectEvent(event) {
      // Don't allow selecting full events
      if (event.paxAvailable === 0) return;

      this.selectedEvent = event;
      this.joinSuccess = false;
    },

    joinEvent(event) {
      // Don't allow joining full events
      if (event.paxAvailable === 0) return;

      this.selectEvent(event);
    },

    confirmJoin() {
      // Simulate API call to join the event
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.joinSuccess = true;

        // Update event data (paxAvailable decreases by 1)
        const event = this.eventsForSelectedDate.find(e => e.id === this.selectedEvent.id);
        if (event) {
          event.paxAvailable -= 1;
        }

        // Reset selection
        this.selectedEvent = null;

        // Emit event to parent component
        this.$emit('event-joined', event);
      }, 1000);
    },

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
.lunch-events-container {
  margin-top: 20px;
}

.table-hover tbody tr {
  cursor: pointer;
}

.table-active {
  background-color: rgba(0, 123, 255, 0.1) !important;
}

/* Incorporate your application's button styling */
.action-button {
  padding: 6px 12px;
  font-size: 14px;
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

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>