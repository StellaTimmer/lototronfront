<template>
  <div>
    <ul class="nav nav-tabs" id="lunchTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming" type="button"
                role="tab">
          Kõik tulemas
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab">
          Kõik möödunud
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="upcoming" role="tabpanel">

        <h5 class="mt-3 text-primary">Minu loodud</h5>
        <div v-if="upcomingCreatedLunches.length === 0" class="p-2 text-muted">
          Sa pole loonud veel ühtegi lõunat!
        </div>
        <table v-else class="table table-sm">
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
          <tr v-for="lunch in upcomingCreatedLunches" :key="'created-'+lunch.id" class="table-info">
            <td>{{ formatDate(lunch.date) }}</td>
            <td>{{ lunch.time }}</td>
            <td>{{ lunch.restaurantName }}</td>
            <td>{{ lunch.paxTotal }} ({{ lunch.paxAvailable }} vaba)</td>
            <td>
              <button @click="cancelLunch(lunch.id)" class="btn btn-sm btn-outline-danger me-2">
                Tühista
              </button>
              <button @click="editLunch(lunch)" class="btn btn-sm btn-outline-warning">
                Muuda
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <h5 class="mt-4 text-success">Lõunad, millega olen liitunud</h5>
        <div v-if="upcomingJoinedLunches.length === 0" class="p-2 text-muted">
          Sa pole liitunud ühegi lõunaga!
        </div>
        <table v-else class="table table-sm">
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
          <tr v-for="lunch in upcomingJoinedLunches" :key="'joined-'+lunch.id" class="table-success">
            <td>{{ formatDate(lunch.date) }}</td>
            <td>{{ lunch.time }}</td>
            <td>{{ lunch.restaurantName }}</td>
            <td>{{ lunch.paxTotal }} ({{ lunch.paxAvailable }} vaba)</td>
            <td>
              <button @click="leaveLunch(lunch.id)" class="btn btn-sm btn-outline-warning">
                Loobu
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade" id="past" role="tabpanel">

        <h5 class="mt-3 text-primary">Minu loodud</h5>
        <div v-if="pastCreatedLunches.length === 0" class="p-2 text-muted">
          Sul pole möödunud loodud lõunaid.
        </div>
        <table v-else class="table table-sm">
          <thead>
          <tr>
            <th>Kuupäev</th>
            <th>Aeg</th>
            <th>Restoran</th>
            <th>Osalejate arv</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="lunch in pastCreatedLunches" :key="'past-created-'+lunch.id" class="table-info">
            <td>{{ formatDate(lunch.date) }}</td>
            <td>{{ lunch.time }}</td>
            <td>{{ lunch.restaurantName }}</td>
            <td>{{ lunch.paxTotal }}</td>
          </tr>
          </tbody>
        </table>


        <h5 class="mt-4 text-success">Lõunad, millega olin liitunud</h5>
        <div v-if="pastJoinedLunches.length === 0" class="p-2 text-muted">
          Sul pole möödunud lõunaid, millega olid liitunud.
        </div>
        <table v-else class="table table-sm">
          <thead>
          <tr>
            <th>Kuupäev</th>
            <th>Aeg</th>
            <th>Restoran</th>
            <th>Osalejate arv</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="lunch in pastJoinedLunches" :key="'past-joined-'+lunch.id" class="table-success">
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
    upcomingCreatedLunches: {
      type: Array,
      default: () => []
    },
    pastCreatedLunches: {
      type: Array,
      default: () => []
    },
    upcomingJoinedLunches: {
      type: Array,
      default: () => []
    },
    pastJoinedLunches: {
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
    },

    editLunch(lunch) {
      this.$emit('event-edit-lunch', lunch);
    }
  }
}
</script>