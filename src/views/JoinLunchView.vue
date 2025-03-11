<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Liitu lõunaga</h1>

    <div class="row">
      <!--Kutsume CalendarView välja-->
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h4>Vali kuupäev</h4>
          </div>
          <div class="card-body py-3">
            <CalendarView :events="calendarEvents"
                          :selectedDate="selectedDate"
                          @date-selected="handleDateSelected"
                          @month-changed="handleMonthChanged"
            />
          </div>
        </div>
      </div>
      <!--Kutsume MyEvents välja-->
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">
            <h4>Minu lõunad</h4>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab"
                        data-bs-target="#upcoming-tab-pane" type="button" role="tab"
                        aria-controls="upcoming-tab-pane" aria-selected="true">
                  Tulemas
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="past-tab" data-bs-toggle="tab"
                        data-bs-target="#past-tab-pane" type="button" role="tab"
                        aria-controls="past-tab-pane" aria-selected="false">
                  Möödunud
                </button>
              </li>
            </ul>

            <div class="tab-content pt-3" id="myTabContent">
              <!--Tulemas evendid-->
              <div class="tab-pane fade show active" id="upcoming-tab-pane" role="tabpanel"
                   aria-labelledby="upcoming-tab" tabindex="0">
                <p v-if="upcomingMyEvents.length === 0" class="text-muted">Sul pole tulevaid lõunaid.</p>
                <ul v-else class="list-group">
                  <li v-for="event in upcomingMyEvents" :key="event.id"
                      class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ formatDateDisplayToEstonian(event.date) }}</strong> kell {{ event.time }}
                      <br/>
                      <span class="text-muted">{{ event.restaurantName }}</span>
                    </div>
                    <span class="badge bg-primary rounded-pill">{{ event.paxTotal }} inimest</span>
                  </li>
                </ul>
              </div>
              <!--Möödunud evendid-->
              <div class="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabindex="0">
                <p v-if="pastMyEvents.length === 0" class="text-muted">Sul pole möödunud lõunaid.</p>
                <ul v-else class="list-group">
                  <li v-for="event in pastMyEvents" :key="event.id"
                      class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ formatDateDisplayToEstonian(event.date) }}</strong> kell {{ event.time }}
                      <br/>
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
    <!--Evendid valitud kuupäeval-->
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
              Sellel päeval pole veel keegi korraldanud lõunat.
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
                  <!--Juba liitunud evendiga-->
                  <span v-if="hasUserJoinedEvent(event.id)" class="badge bg-success">Juba liitunud</span>

                  <!--Liitumine evendiga-->
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

            <!--liitumise kinnitamine-->
            <div v-if="selectedEvent" class="mt-3 p-3 border rounded bg-light">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Valitud:</strong> {{ selectedEvent.restaurantName }} kell {{ selectedEvent.time }}
                </div>

                <div v-if="hasUserJoinedEvent(selectedEvent.id)" class="text-success">
                  <strong>Oled juba selle lõunaga liitunud!</strong>
                </div>
                <button
                    v-else
                    class="action-button yellow"
                    @click="confirmJoin"
                >
                  Kinnita
                </button>
              </div>
            </div>

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
import RestaurantService from "@/services/RestaurantService";
import LunchEventService from "@/services/LunchEventService";

export default {
  name: 'JoinLunchView',
  components: {CalendarView},
  data() {
    return {
      selectedDate: new Date(),
      selectedEvent: null,
      joinSuccess: false,
      isLoading: false,
      userId: null,
      lunchEvents: [
        {
          id: 0,
          date: '',
          time: '',
          restaurantName: '',
          paxTotal: 0,
          paxAvailable: 0,
          status: ''
        },
      ],
      myEvents: [
        {
          id: 0,
          lunchEventId: 0,
          date: '',
          time: '',
          restaurantName: '',
          paxTotal: 0,
          status: ''
        },
      ],
      restaurants: []
    };
  },

  computed: {

    calendarEvents() {
      const eventsByDate = this.groupEventsByDate(this.lunchEvents);
      return this.formatEventsForCalendar(eventsByDate);
    },

    eventsForSelectedDate() {
      if (!this.selectedDate) return [];

      const formattedDate = this.formatDate(this.selectedDate);
      return this.lunchEvents.filter(event => event.date === formattedDate);
    },

    upcomingMyEvents() {
      return this.myEvents.filter(event => event.status === 'upcoming');
    },

    pastMyEvents() {
      return this.myEvents.filter(event => event.status === 'past');
    }

  },

  methods: {

    handleDateSelected(date) {
      this.selectedDate = date;
      this.selectedEvent = null;
      this.joinSuccess = false;
      this.fetchLunchEvents(this.formatDate(date));
    },

    handleMonthChanged(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      this.fetchLunchEventsForMonth(year, month);
    },

    hasUserJoinedEvent(eventId) {
      return this.myEvents.some(myEvent =>
          myEvent.lunchEventId === eventId && myEvent.status === 'upcoming'
      );
    },

    selectEvent(event) {
      if (this.selectedEvent && this.selectedEvent.id === event.id) return;

      this.selectedEvent = event;
      this.joinSuccess = false;
    },

    joinEvent(event) {
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

    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    formatDateDisplayToEstonian(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('et-EE', {
        month: 'long',
        day: 'numeric'
      });
    },

    getUserIdFromSessionStorage() {
      return sessionStorage.getItem('userId') || 0;
    },

    fetchLunchEvents(date) {
      this.isLoading = true;

      LunchEventService.sendGetLunchEventsByDateRequest(date)
          .then(response => {
            this.lunchEvents = this.transformEventsData(response.data);
          })
          .catch(error => {
            console.error('Error fetching lunch events by date:', error);
          })
          .finally(() => {
            this.isLoading = false;
          });
    },

    fetchLunchEventsForMonth(year, month) {
      this.isLoading = true;

      LunchEventService.sendGetLunchEventsByMonthRequest(year, month)
          .then(response => {
            this.lunchEvents = this.transformEventsData(response.data);
          })
          .catch(error => {
            console.error('Error fetching lunch events for month:', error);
          })
          .finally(() => {
            this.isLoading = false;
          });
    },

    fetchMyEvents() {
      // In a real application, this would be an API call
      // axios.get('/api/my-lunch-events', { params: { userId: this.userId } })
      //   .then(response => {
      //     this.myEvents = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching my events:', error);
      //
      //   });
    },

    groupEventsByDate(events) {
      const groupedEvents = {};

      events.forEach(event => {
        const eventDate = event.date;

        if (!groupedEvents[eventDate]) {
          groupedEvents[eventDate] = [];
        }

        groupedEvents[eventDate].push(event);
      });

      return groupedEvents;
    },

    dateHasAvailableEvents(eventsForDate) {
      return eventsForDate.some(event =>
          event.paxAvailable > 0 && !this.hasUserJoinedEvent(event.id)
      );
    },

    formatEventsForCalendar(groupedEvents) {
      return Object.keys(groupedEvents).map(date => {
        const hasAvailableEvents = this.dateHasAvailableEvents(groupedEvents[date]);

        return {
          date: date,
          status: hasAvailableEvents ? 'available' : 'full'
        };
      });
    },

    transformEventsData(eventsData) {
      if (!eventsData || !Array.isArray(eventsData)) return [];

      return eventsData.map(event => {
        // Create a new object with all original properties
        const transformedEvent = { ...event };

        // Map restaurantId to restaurantName
        const restaurant = this.restaurants.find(r => r.restaurantId === event.restaurantId);
        transformedEvent.restaurantName = restaurant ? restaurant.restaurantName : `Restaurant #${event.restaurantId}`;

        return transformedEvent;
      });
    },

    fetchRestaurants: function () {
      return RestaurantService.sendGetRestaurantsRequest()
          .then(response => {
            this.restaurants = response.data;
            return response; // Return the promise
          })
          .catch(error => {
            console.error('Error fetching restaurants:', error);
            return Promise.reject(error);
          });
    }

  },

  mounted() {
    this.userId = this.getUserIdFromSessionStorage();

    // First fetch all restaurants
    this.fetchRestaurants()
        .then(() => {
          // Then fetch events for current date
          this.fetchLunchEvents(this.formatDate(this.selectedDate));

          // And fetch user's events
          this.fetchMyEvents();
        })
        .catch(error => {
          console.error("Could not fetch restaurants:", error);
          // Still try to fetch events even if restaurants failed
          this.fetchLunchEvents(this.formatDate(this.selectedDate));
          this.fetchMyEvents();
        });
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