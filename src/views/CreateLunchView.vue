<template>

  <div>

    <div class="container text-center mt-5">

      <div class="row">

        <div><h1 class="mb-5">LOO LÕUNA:</h1></div>

        <div class="col"><h3 class="mb-5">Vali kuupäev:</h3>

          <!--      // kuupäeva valikuks kalender:-->
          <div style="margin-bottom: 150px;">
            <label for="date-picker">Valikus tööpäevad:</label><br>

            <h3><input
                type="date"
                id="date-picker"
                v-model="selectedDate"
                @click="disableWeekends"
                @input="checkWeekend"
            /></h3>

            <!-- Modal for weekend error -->
            <div v-if="isWeekendSelected" class="modal">
              <div class="modal-content">
                <h3>Laupäevad ja pühapäevad ei ole valikus.</h3>
                <button @click="closeModal">Close</button>
              </div>
            </div>
            <p>{{lunchEventDto.date}}</p>
          </div>

          <div><h3> Vali söögikoht: </h3></div>
          <RestaurantsDropdown :available-restaurants="restaurants"
                               :selected-restaurant-id="lunchEventDto.restaurantId"
                               @event-new-restaurant-selected="setSelectedRestaurantId"
          />

        </div>

        <div class="col">
          <div style="margin-bottom: 80px;"><h3> Vali kellaaeg: </h3></div>
          <div style="margin-bottom: 270px;"><h3><input type="time"
                                                        v-model="lunchEventDto.time"
                                                        name="timeInput"
                                                        id="timeInput"></h3></div>


          <div>
            <button @click="createLunchEvent" type="submit" class="btn btn-warning btn-lg">KINNITA LÕUNA</button>
          </div>

        </div>


        <div class="col">

          <div style="margin-bottom: 100px;"><h5> Sinu lõunad: </h5></div>

          <div style="margin-bottom: 80px;"> Tulemas:</div>

          <div>Möödunud:</div>

        </div>

        <div class="col">
          Siia tulevad reklaamid
        </div>

      </div>
    </div>

  </div>


</template>


<script>
import RestaurantsDropdown from "@/components/restaurants/RestaurantsDropdown.vue";
import SelectedRestaurantService from "@/services/SelectedRestaurantService";
import NavigationService from "@/services/NavigationService";
import axios from "axios";
import LunchEventService from "@/services/LunchEventService";

export default {
  name: "CreateLunchView",
  components: {RestaurantsDropdown},

  data() {
    return {
      selectedRestaurantId: 0,
      minDate: '',  // Minimum allowable date
      maxDate: '',  // Maximum allowable date
      isWeekendSelected: false, // Flag to show weekend selection error
      restaurants: [
        {
          restaurantId: 0,
          restaurantName: ''
        }
      ],
      isOkToCreateNewLunchEvent: false,
      lunchEventDto: {
        userId: 0,
        restaurantId: 0,
        paxTotal: 0,
        paxAvailable: 0,
        date: '',
        time: ''
      },
    };
  },
  methods: {

    setSelectedRestaurantId(selectedRestaurantId) {
      this.lunchEventDto.selectedRestaurantId = selectedRestaurantId
    },

    getRestaurants() {
      SelectedRestaurantService.sendGetRestaurantsRequest()
          .then(response => this.handleGetRestaurantsResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetRestaurantsResponse(response) {
      this.restaurants = response.data
    },

    createLunchEvent() {
      if (this.allFieldsAreWithInput()) {
        this.sendPostCreateLunchEventRequest();
      } else {
        this.alertMissingFields();
      }
    },
    sendPostCreateLunchEventRequest() {
      LunchEventService.sendPostLunchEventRequest(this.lunchEventDto)
          .then(response => this.handlePostCreateLunchEventRequest(response))
          .catch(error => this.handlePostCreateLunchEventErrorRequest(error))
    },

    allFieldsAreWithInput() {
      //TODO:  Suts ridu, et vaadata, kas date + time + resto + id + paxud on olemas
      return true;
    },

    alertMissingFields() {
      //TODO:  nats meetodit siia ka
    },


    // Meetod - handleCreateLunchEvent(),




    disableWeekends() {
      Date.now()
      const today = new Date();

      // Set min date (disable weekends before today)
      let minDate = new Date(2000, 0, 1);

      // Set max date (disable weekends after today)
      let maxDate = new Date(9999, 11, 31);

      // Set min and max date attributes
      this.minDate = minDate.toISOString().split('T')[0];
      this.maxDate = maxDate.toISOString().split('T')[0];
    },

    // Check if the selected date is a weekend
    checkWeekend() {
      const selected = new Date(this.selectedDate);
      const day = selected.getDay();

      if (day === 0 || day === 6) {
        this.isWeekendSelected = true;
      } else {
        this.isWeekendSelected = false;
      }
    },
    closeModal() {
      this.isWeekendSelected = false;
    }
  },


  mounted() {
    // Call the method on mounted to initialize the date restrictions
    this.disableWeekends();
    this.getRestaurants();
  },
}


// TODO: Siin L&P-päeva errori modal - lisada CSS faili Make-it-pretty faasis
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #186671;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  width: 1200px;
}

button:hover {
  background-color: #d7b710;
}
</style>
