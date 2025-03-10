<template xmlns:AlertDanger="http://www.w3.org/1999/html">
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Vaheta parool </h1>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <AlertDanger :message="errorMessage" />
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Vana parool</label>
              <input
                  type="password"
                  id="oldPassword"
                  v-model="passwordData.oldPassword"
                  class="form-control"
                  placeholder="Sisesta vana parool"
              />
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Uus parool</label>
              <input
                  type="password"
                  id="newPassword"
                  v-model="passwordData.newPassword"
                  class="form-control"
                  placeholder="Sisesta uus parool"
              />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Kinnita uus parool</label>
              <input
                  type="password"
                  id="confirmPassword"
                  v-model="passwordData.confirmPassword"
                  class="form-control"
                  placeholder="Kinnita uus parool"
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="handleReset">Taasta</button>
              <button type="submit" class="btn btn-primary">Muuda</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "ChangePasswordModal",
  components: {AlertDanger},
  props: {
    isModalOpen: Boolean,
  },
  data() {
    return {
      passwordData: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
    this.$emit("submit", this.passwordData);
    this.$emit("close");
      }else{
       this.errorMessage = 'Paroolid ei ühti!'
        setTimeout(this.errorMessage = '', 3000)
      }
    },
    handleReset() {
  this.passwordData = {oldPassword: "",newPassword: "",confirmPassword: ""};
    },
  },
};
</script>

<style scoped>
/* Modal stiilid */
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
