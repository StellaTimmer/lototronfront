<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Liitu Lõunaga</h1>

    <div class="row">
      <div class="col-md-6">
        <!-- Calendar component -->
        <div class="card mb-4">
          <div class="card-header">
            <h4>Vali kuupäev</h4>
          </div>
          <div class="card-body py-3">
            <CalendarView
                :events="calendarEvents"
                :selectedDate="selectedDate"
                @date-selected="handleDateSelected"
                @month-changed="handleMonthChanged"
            />
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <!-- My upcoming lunch events component -->
        <div class="card mb-4">
          <div class="card-header">
            <h4>Minu lõunad</h4>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                    class="nav-link active"
                    id="upcoming-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#upcoming-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="upcoming-tab-pane"
                    aria-selected="true"
                >
                  Tulemas
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    id="past-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#past-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="past-tab-pane"
                    aria-selected="false"
                >
                  Möödunud
                </button>
              </li>
            </ul>

            <div class="tab-content pt-3" id="myTabContent">
              <div class="tab-pane fade show active" id="upcoming-tab-pane" role="tabpanel" aria-labelledby="upcoming-tab" tabindex="0">
                <p v-if="upcomingEvents.length === 0" class="text-muted">Sul pole tulevaid lõunaid.</p>
                <ul v-else class="list-group">
                  <li v-for="event in upcomingEvents" :key="event.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ formatDateDisplay(event.date) }}</strong> kell {{ event.time }}
                      <br />
                      <span class="text-muted">{{ event.restaurantName }}</span>
                    </div>
                    <span class="badge bg-primary rounded-pill">{{ event.paxTotal }} inimest</span>
                  </li>
                </ul>
              </div>

              <div class="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabindex="0">
                <p v-if="pastEvents.length === 0" class="text-muted">Sul pole möödunud lõunaid.</p>
                <ul v-else class="list-group">
                  <li v-for="event in pastEvents" :key="event.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ formatDateDisplay(event.date) }}</strong> kell {{ event.time }}
                      <br />
                      <span class="text-muted">{{ event.restaurantName }}</span>
                    </div>
                    <span class="badge bg-secondary rounded-pill">{{ event.paxTotal }} inimest</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lunch events table for selected date -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Lõunasündmused</h4>
          </div>
          <div class="card-body">
            <p v-if="!selectedDate" class="text-center text-muted">
              Palun vali kuupäev kalendrist.
            </p>

            <p v-else-if="eventsForSelectedDate.length === 0" class="text-center text-muted">
              Sellel päeval pole lõunasündmusi.
            </p>

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
                  <!-- Already joined indicator -->
                  <span v-if="hasUserJoinedEvent(event.id)" class="badge bg-success">Juba liitunud</span>

                  <!-- Join button (disabled if full or already joined) -->
                  <button
                      v-else
                      class="action-button yellow"
                      :disabled="event.paxAvailable === 0 || hasUserJoinedEvent(event.id)"
                      @click.stop="joinEvent(event)"
                  >
                    Liitu
                  </button>
                </td>
              </tr>
              </tbody>
            </table>

            <!-- Join confirmation section -->
            <div v-if="selectedEvent" class="mt-3 p-3 border rounded bg-light">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Valitud:</strong> {{ selectedEvent.restaurantName }} kell {{ selectedEvent.time }}
                </div>

                <!-- Show different message if already joined -->
                <div v-if="hasUserJoinedEvent(selectedEvent.id)" class="text-success">
                  <strong>Oled juba selle lõunaga liitunud!</strong>
                </div>
                <button
                    v-else
                    class="action-button yellow"
                    @click="confirmJoin"
                >
                  Kinnita liitumine
                </button>
              </div>
            </div>

            <!-- Success alert -->
            <div v-if="joinSuccess" class="alert alert-success mt-3">
              Oled edukalt liitunud lõunasündmusega!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarView from '@/components/lunchevent/CalendarView.vue';
import axios from 'axios';

export default {
  name: 'JoinLunchView',
  components: {
    CalendarView
  },
  data() {
    return {
      selectedDate: new Date(),
      selectedEvent: null,
      joinSuccess: false,
      isLoading: false,
      userId: null, // Will be set from session storage
      // Mock events data - would be fetched from an API in a real application
      lunchEvents: [
        {
          id: 1,
          date: '2025-03-10',
          time: '12:00',
          restaurantName: 'Vapiano',
          paxTotal: 4,
          paxAvailable: 2,
          status: 'available'
        },
        {
          id: 2,
          date: '2025-03-10',
          time: '13:00',
          restaurantName: 'Lendav Taldrik',
          paxTotal: 6,
          paxAvailable: 3,
          status: 'available'
        },
        {
          id: 3,
          date: '2025-03-11',
          time: '12:30',
          restaurantName: 'Ülo Resto',
          paxTotal: 3,
          paxAvailable: 0,
          status: 'full'
        },
        {
          id: 4,
          date: '2025-03-14',
          time: '12:15',
          restaurantName: 'Kohvik Moon',
          paxTotal: 5,
          paxAvailable: 2,
          status: 'available'
        }
      ],
      // My events - this keeps track of which events the user has joined
      myEvents: [
        {
          id: 101,
          lunchEventId: 3, // This connects to the lunch event with ID 3
          date: '2025-03-11',
          time: '12:30',
          restaurantName: 'Ülo Resto',
          paxTotal: 3,
          status: 'upcoming'
        },
        {
          id: 102,
          lunchEventId: 4, // This connects to the lunch event with ID 4 (but dated as past)
          date: '2025-03-05',
          time: '13:30',
          restaurantName: 'Karja Kelder',
          paxTotal: 4,
          status: 'past'
        }
      ]
    };
  },
  computed: {
    // Format events for the calendar component
    calendarEvents() {
      // Group events by date to determine which days have events
      const eventsByDate = {};

      this.lunchEvents.forEach(event => {
        // Extract just the date part (YYYY-MM-DD)
        const eventDate = event.date;

        if (!eventsByDate[eventDate]) {
          eventsByDate[eventDate] = [];
        }

        eventsByDate[eventDate].push(event);
      });

      // Convert to array format expected by calendar
      return Object.keys(eventsByDate).map(date => {
        // Check if there are any available events for this date
        const hasAvailableEvents = eventsByDate[date].some(event =>
            event.paxAvailable > 0 && !this.hasUserJoinedEvent(event.id)
        );

        return {
          date: date,
          status: hasAvailableEvents ? 'available' : 'full'
        };
      });
    },

    // Events for the selected date
    eventsForSelectedDate() {
      if (!this.selectedDate) return [];

      const formattedDate = this.formatDate(this.selectedDate);
      return this.lunchEvents.filter(event => event.date === formattedDate);
    },

    // Upcoming events for the user
    upcomingEvents() {
      return this.myEvents.filter(event => event.status === 'upcoming');
    },

    // Past events for the user
    pastEvents() {
      return this.myEvents.filter(event => event.status === 'past');
    }
  },
  mounted() {
    // Get user ID from session storage
    this.userId = this.getUserId();
    this.fetchLunchEvents();
    this.fetchMyEvents();
  },
  methods: {
    handleDateSelected(date) {
      this.selectedDate = date;
      this.selectedEvent = null;
      this.joinSuccess = false;
      this.fetchLunchEvents(this.formatDate(date));
    },

    handleMonthChanged(date) {
      // Fetch events for the new month
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      this.fetchLunchEventsForMonth(year, month);
    },

    // Check if the current user has already joined this event
    hasUserJoinedEvent(eventId) {
      return this.myEvents.some(myEvent =>
          myEvent.lunchEventId === eventId && myEvent.status === 'upcoming'
      );
    },

    selectEvent(event) {
      // Don't reset selection if the event is already selected
      if (this.selectedEvent && this.selectedEvent.id === event.id) return;

      this.selectedEvent = event;
      this.joinSuccess = false;
    },

    joinEvent(event) {
      // Don't allow joining full events or events already joined
      if (event.paxAvailable === 0 || this.hasUserJoinedEvent(event.id)) return;

      this.selectEvent(event);
    },

    confirmJoin() {
      // Don't allow joining if already joined
      if (this.hasUserJoinedEvent(this.selectedEvent.id)) return;

      // Simulate API call to join the event
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.joinSuccess = true;

        // Update event data (paxAvailable decreases by 1)
        const joinedEvent = this.lunchEvents.find(e => e.id === this.selectedEvent.id);
        if (joinedEvent) {
          joinedEvent.paxAvailable -= 1;

          // If no more spots available, update status
          if (joinedEvent.paxAvailable === 0) {
            joinedEvent.status = 'full';
          }
        }

        // Add to my events with reference to the original lunch event ID
        this.myEvents.push({
          id: Date.now(), // Temporary ID
          lunchEventId: this.selectedEvent.id, // Reference to the original event
          date: joinedEvent.date,
          time: joinedEvent.time,
          restaurantName: joinedEvent.restaurantName,
          paxTotal: joinedEvent.paxTotal,
          status: 'upcoming'
        });

        // In a real application, this would be an API call
        // axios.post('/api/lunch-events/join', {
        //   lunchEventId: this.selectedEvent.id,
        //   userId: this.getUserId()
        // })
        //   .then(response => {
        //     this.joinSuccess = true;
        //     this.fetchLunchEvents(this.formatDate(this.selectedDate));
        //     this.fetchMyEvents();
        //   })
        //   .catch(error => {
        //     console.error('Error joining lunch event:', error);
        //   })
        //   .finally(() => {
        //     this.isLoading = false;
        //   });

        // Reset selection after timeout
        setTimeout(() => {
          this.selectedEvent = null;
        }, 3000);
      }, 1000);
    },

    // Format date to YYYY-MM-DD
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // Format date for display
    formatDateDisplay(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('et-EE', {
        month: 'long',
        day: 'numeric'
      });
    },

    // Get user ID from session storage
    getUserId() {
      return sessionStorage.getItem('userId') || 0;
    },

    // API calls (simulated)
    fetchLunchEvents(date) {
      this.isLoading = true;

      // In a real application, this would be an API call
      // axios.get('/api/lunch-events', { params: { date } })
      //   .then(response => {
      //     this.lunchEvents = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching lunch events:', error);
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },

    fetchLunchEventsForMonth(year, month) {
      this.isLoading = true;

      // In a real application, this would be an API call
      // axios.get('/api/lunch-events', { params: { year, month } })
      //   .then(response => {
      //     this.lunchEvents = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching lunch events:', error);
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },

    fetchMyEvents() {
      // In a real application, this would be an API call
      // axios.get('/api/my-lunch-events', { params: { userId: this.userId } })
      //   .then(response => {
      //     this.myEvents = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching my events:', error);
      //   });
    }
  }
};
</script>

<style scoped>
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

/* Table styling */
.table-hover tbody tr {
  cursor: pointer;
}

.table-active {
  background-color: rgba(0, 123, 255, 0.1) !important;
}
</style>