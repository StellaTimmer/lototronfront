<template>
  <div>
    <ul class="nav nav-tabs" id="lunchTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button" role="tab">
          Tulemas
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab">
          Möödunud
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="upcoming" role="tabpanel">
        <div v-if="upcomingLunches.length === 0" class="p-3">
          Sul pole tulevaid lõunaid.
        </div>
        <table v-else class="table">
          <thead>
          <tr>
            <th>Kuupäev</th>
            <th>Aeg</th>
            <th>Restoran</th>
            <th>Osalejate arv</th>
            <th>Tegevused</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="lunch in upcomingLunches" :key="lunch.id">
            <td>{{ formatDate(lunch.date) }}</td>
            <td>{{ lunch.time }}</td>
            <td>{{ lunch.restaurantName }}</td>
            <td>{{ lunch.paxTotal }} ({{ lunch.paxAvailable }} vaba)</td>
            <td>
              <button v-if="lunch.isCreator"
                      @click="cancelLunch(lunch.id)"
                      class="btn btn-sm btn-outline-danger me-2">
                Tühista
              </button>
              <button v-else
                      @click="leaveLunch(lunch.id)"
                      class="btn btn-sm btn-outline-warning">
                Loobu
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade" id="past" role="tabpanel">
        <div v-if="pastLunches.length === 0" class="p-3">
          Sul pole möödunud lõunaid.
        </div>
        <table v-else class="table">
          <thead>
          <tr>
            <th>Kuupäev</th>
            <th>Aeg</th>
            <th>Restoran</th>
            <th>Osalejate arv</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="lunch in pastLunches" :key="lunch.id">
            <td>{{ formatDate(lunch.date) }}</td>
            <td>{{ lunch.time }}</td>
            <td>{{ lunch.restaurantName }}</td>
            <td>{{ lunch.paxTotal }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLunches',
  props: {
    upcomingLunches: {
      type: Array,
      default: () => []
    },
    pastLunches: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('et-EE');
    },

    cancelLunch(lunchId) {
      this.$emit('event-cancel-lunch', lunchId);
    },

    leaveLunch(lunchId) {
      this.$emit('event-leave-lunch', lunchId);
    }
  }
}
</script>