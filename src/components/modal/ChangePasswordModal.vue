<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="handleBackdropClick">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Vaheta parool</h1>
          <button type="button" class="btn-close" @click="handleClose" aria-label="Close">x</button>
        </div>
        <div class="modal-body">
          <!-- Alert messages -->
          <AlertDanger v-if="errorMessage" :message="errorMessage"/>
          <AlertSuccess v-if="successMessage" :message="successMessage"/>

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
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "ChangePasswordModal",
  components: {AlertSuccess, AlertDanger},
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
      successMessage: "",
      // Add internal state to prevent parent from closing modal
      internalModalOpen: true,
      validationPassed: false
    };
  },
  watch: {
    // Reset internal state when modal opens/closes from parent
    isModalOpen(newVal) {
      this.internalModalOpen = newVal;
      if (newVal) {
        this.handleReset();
      }
    }
  },
  methods: {
    handleSubmit() {
      // Clear any previous messages
      this.errorMessage = "";
      this.successMessage = "";
      this.validationPassed = false;

      // Validate required fields
      if (!this.passwordData.oldPassword) {
        this.errorMessage = "Vana parool on kohustuslik!";
        return; // Stop form submission
      }

      if (!this.passwordData.newPassword) {
        this.errorMessage = "Uus parool on kohustuslik!";
        return; // Stop form submission
      }

      // Check if passwords match
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        this.errorMessage = "Paroolid ei ühti!";
        return; // Stop form submission and keep modal open
      }

      // If we get here, validation has passed
      this.validationPassed = true;
      this.successMessage = "Parool edukalt muudetud!";

      // Only emit submit event if validation passed
      this.$emit("submit", this.passwordData);

      // Optional: Auto-close after a delay
      setTimeout(() => {
        if (this.validationPassed) {
          this.handleClose();
        }
      }, 2000);
    },

    handleReset() {
      this.passwordData = { oldPassword: "", newPassword: "", confirmPassword: "" };
      this.errorMessage = "";
      this.successMessage = "";
      this.validationPassed = false;
    },

    handleClose() {
      // Only allow closing if validation passed or user clicked close button
      this.internalModalOpen = false;
      this.$emit("close");
      this.handleReset();
    },

    // Close when clicking outside the modal
    handleBackdropClick() {
      this.handleClose();
    }
  },
};
</script>

<style scoped>
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
  z-index: 1050; /* Higher z-index to ensure it's on top */
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.modal-body {
  padding: 10px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

button {
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>