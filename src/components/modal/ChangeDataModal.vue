<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Muuda andmeid</h1>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="firstName" class="form-label">Eesnimi</label>
<!--              <input type="text" :value="currentUserData.firstName" @input="$emit('event-firstName-changed', $event.target.value)">-->
              <input
                  type="text"
                  id="firstName"
                  :value="currentUserData.firstName"
                  @input="$emit('event-firstName-changed', $event.target.value)"
                  class="form-control"
                  placeholder="Sisesta eesnimi"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Perekonnanimi</label>
              <input
                  type="text"
                  id="lastName"
                  :value="currentUserData.lastName"
                  @input="$emit('event-lastName-changed', $event.target.value)"
                  class="form-control"
                  placeholder="Sisesta perekonnanimi"
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Telefoninumber</label>
              <input
                  type="text"
                  id="phone"
                  :value="currentUserData.phoneNumber"
                  @input="$emit('event-phoneNumber-changed', $event.target.value)"
                  class="form-control"
                  placeholder="Sisesta telefoninumber"
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="handleReset">Taasta</button>
              <button type="submit" class="btn btn-primary" @click="handleSubmit">Kinnita</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChangeDataModal",
  props: {
    isModalOpen: Boolean,
    currentUserData: Object,
  },
  methods: {

     handleSubmit() {
      this.$emit("event-update-profile");
    },

    handleReset() {
      this.$emit('event-firstName-changed', "")
      this.$emit('event-lastName-changed', "")
      this.$emit('event-phoneNumber-changed', "")
    },
  },
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-body {
  padding: 10px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

button {
  margin-top: 10px;
}
</style>
