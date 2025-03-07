<template>

  <div>
    <select class="form-select" v-model="attendeeCount" @change="updateValues">
      <option disabled value="">Lõunatajate arv</option>
      <option v-for="n in 9" :key="n" :value="n + 1">{{ n + 1 }}</option>
    </select>
  </div>

</template>

<script>

export default {
  name: "AttendanceSelector",

  props: {
    initialCount: {
      type: Number,
      default: 2
    }
  },

  data() {
    return {
      attendeeCount: "",
    }
  },

  methods: {

    updateValues() {
      const availableSpots = Math.max(0, this.attendeeCount - 1)
      this.$emit('attendance-updated', {
        paxTotal: this.attendeeCount,
        paxAvailable: availableSpots
      })
    },
  }
}
</script>
