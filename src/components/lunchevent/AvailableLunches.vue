<template>
  <div>
    <div v-if="availableLunches.length === 0" class="alert alert-info">
      Valitud kuupäeval pole ühtegi saadaval lõunat.
    </div>
    <div v-else>
      <div v-for="lunch in availableLunches" :key="lunch.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ lunch.restaurantName }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ formatTime(lunch.time) }}</h6>
          <p class="card-text">
            <strong>Kohti:</strong> {{ lunch.paxAvailable }} / {{ lunch.paxTotal }}<br>
            <strong>Aadress:</strong> {{ lunch.restaurantAddress }}
          </p>
          <button v-if="!lunch.isCreator && !lunch.isJoined"
                  @click="joinLunch(lunch.id)"
                  class="btn btn-outline-success"
                  :disabled="lunch.paxAvailable <= 0">
            Liitu
          </button>
          <span v-else-if="lunch.isCreator" class="badge bg-primary">Sinu loodud</span>
          <span v-else class="badge bg-success">Juba liitunud</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvailableLunches',
  props: {
    availableLunches: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatTime(timeString) {
      if (!timeString) return '';

      // If the time includes seconds, remove them
      if (timeString.includes(':')) {
        const parts = timeString.split(':');
        return `${parts[0]}:${parts[1]}`;
      }

      return timeString;
    },

    joinLunch(lunchEventId) {
      this.$emit('event-join-lunch', lunchEventId);
    }
  }
}
</script>