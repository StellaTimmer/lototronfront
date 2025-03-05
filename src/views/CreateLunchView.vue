
<template>

  <div>

    <div class="container text-center">
      <br>
      <br>
      <br>

      <div class="row">

        <div> <h1>LOO LÕUNA:</h1> </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="col">
          <div> <h3>Vali kuupäev:</h3> </div>
          <br>
          <br>
<!--          // kuupäeva valik:-->

          <div>
            <label for="date-picker">Vali sobiv tööpäev:</label>
            <br>
            <h3>
            <input
                type="date"
                id="date-picker"
                v-model="selectedDate"
                :min="minDate"
                :max="maxDate"
                @click="disableWeekends"
                @input="checkWeekend"
            />
            </h3>

            <!-- Modal for weekend error -->
            <div v-if="isWeekendSelected" class="modal">
              <div class="modal-content">
                <h3>Laupäevad ja pühapäevad ei ole valikus.</h3>
                <button @click="closeModal">Close</button>
              </div>
            </div>


            <p>Valitud kuupäev: {{ selectedDate }}</p>
          </div>

          <!--//vahe elementide vahel:-->
          <div style="margin-bottom: 150px;"></div>

          <div> <h3> Vali söögikoht: </h3> </div>

          
        </div>


        <div class="col">

          <div> <h3> Vali kellaaeg: </h3> </div>

          <div style="margin-bottom: 150px;"></div>

          <div>
            <button type="submit" class="btn btn-warning btn-lg">KINNITA LÕUNA</button>

          </div>

        </div>


        <div class="col">

          <div> <h5> Sinu lõunad: </h5> </div>
          <br>
          <br>
          <br>
          <br>
          <div>
            Tulemas:
          </div>
          <br>
          <br>
          <div>
            Möödunud:
          </div>

        </div>

        <div class="col">
          Siia tulevad reklaamid
        </div>

      </div>
    </div>

  </div>


</template>


<script>
export default {
  name: "CreateLunchView",

  data() {
    return {
      selectedDate: '',  // Holds the selected date
      minDate: '',  // Minimum allowable date
      maxDate: '',  // Maximum allowable date
      isWeekendSelected: false, // Flag to show weekend selection error
    };
  },
  methods: {
    disableWeekends() {
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

      if (day === 0 || day === 6) { // Sunday (0) or Saturday (6)
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
  },
}



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
