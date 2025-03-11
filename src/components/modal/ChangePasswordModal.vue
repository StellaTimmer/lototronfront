<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Vaheta parool</h1>
          <button type="button" class="btn-close" @click="handleClose" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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

            <!-- ✅ Siin kuvatakse veateade, kui paroolid ei ühti -->
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="handleReset">Taasta</button>
              <button type="submit" class="btn btn-primary" :disabled="!isPasswordValid">Muuda</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordModal",
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
      errorMessage: "", //
    };
  },
  computed: {
    isPasswordValid() {
      return this.passwordData.newPassword === this.passwordData.confirmPassword
          && this.passwordData.newPassword.length > 0;
    },
  },
  methods: {
    handleSubmit() {
    this.errorMessage ="";
    if ( this.passwordData.newPassword !== this.passwordData.confirmPassword ) {
      this.errorMessage = "Paroolid ei ühti!";
      return;
    }
    this.$emit("submit", this.passwordData);
    this.$emit("close");
    },
    handleReset() {
      this.passwordData = { oldPassword: "", newPassword: "", confirmPassword: "" };
      this.errorMessage = "";
    },

    handleClose() {
      this.$emit("close");
      this.errorMessage = "";
      this.handleReset();
    }
  },
};
</script>

<style scoped>
/* ✅ Stiil veateate jaoks */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

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
