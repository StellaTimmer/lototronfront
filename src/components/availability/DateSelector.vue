<template>

  <div>


    <h3 class="mb-5">Vali kuupäev:</h3>

    <!--      // kuupäeva valikuks kalender:-->
    <div style="margin-bottom: 150px;">
      <label for="date-picker">Valikus tööpäevad:</label><br>

      <h3><input
          type="date"
          id="date-picker"
          v-model="localDate"
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
      <p>{{ localDate }}</p>
    </div>

  </div>


</template>

<script>
export default {
  name: "DateSelector",

  data() {
    return {
      localDate: '', // Local copy of the date
      isWeekendSelected: false,
      minDate: '',
      maxDate: ''
    };
  },
  emits: ['update:date'], // Define events to emit
  props: {
    date: {
      type: String,
      default: ''
    }
  },
  watch: {
    localDate(newDate) {
      this.$emit('update:date', newDate); // Emit the updated date
    },
    date(newDate) {
      this.localDate = newDate;
    }
  },
  methods: {
    disableWeekends() {
      Date.now();
      const today = new Date();
      let minDate = new Date(2000, 0, 1);
      let maxDate = new Date(9999, 11, 31);
      this.minDate = minDate.toISOString().split('T')[0];
      this.maxDate = maxDate.toISOString().split('T')[0];
    },

    checkWeekend() {
      const selected = new Date(this.localDate);
      const day = selected.getDay();

      if (day === 0 || day === 6) {
        this.isWeekendSelected = true;
      } else {
        this.isWeekendSelected = false;
      }
    },
    closeModal() {
      this.isWeekendSelected = false;
    },
  },
  mounted() {
    this.disableWeekends();
    this.localDate = this.date
  },
};
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






