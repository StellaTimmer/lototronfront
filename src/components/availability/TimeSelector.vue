<template>

  <div>
    <h3 class="mb-5">Vali kellaaeg:</h3>

    <div style="margin-bottom: 50px;">
      <h3><input type="time" v-model="localTime" name="timeInput" id="timeInput" /></h3>
    </div>

  </div>

</template>


<script>
export default {
  name: "TimeSelector",

  data() {
    return {
      localTime: '', // Local copy of the time
    };
  },
  emits: ['update:time'], // Define events to emit
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  watch: {
    localTime(newTime) {
      this.$emit('update:time', newTime); // Emit the updated time
    },
    time(newTime) {
      this.localTime = newTime;
    }
  }

}
</script>


