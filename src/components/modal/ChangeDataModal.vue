<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Muuda andmeid</h1>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close">x</button>
        </div>
        <div class="modal-body">
          <!-- Alert messages -->
          <AlertDanger v-if="errorMessage" :message="errorMessage"/>
          <AlertSuccess v-if="successMessage" :message="successMessage"/>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="firstName" class="form-label">Eesnimi</label>
              <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  class="form-control"
                  placeholder="Sisesta eesnimi"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Perekonnanimi</label>
              <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  class="form-control"
                  placeholder="Sisesta perekonnanimi"
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Telefoninumber</label>
              <input
                  type="text"
                  id="phone"
                  v-model="formData.phoneNumber"
                  class="form-control"
                  placeholder="Sisesta telefoninumber"
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="handleReset">Taasta</button>
              <button type="submit" class="btn btn-primary">Kinnita</button>
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
  name: "ChangeDataModal",
  components: { AlertDanger, AlertSuccess },
  props: {
    isModalOpen: Boolean,
    currentUserData: Object,
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  watch: {
    isModalOpen(newVal) {
      if (newVal) {
        this.formData = { ...this.currentUserData };
        this.errorMessage = "";
        this.successMessage = "";
      }
    }
  },
  methods: {
    validateForm() {
      this.errorMessage = "";
      if (!this.formData.firstName) {
        this.errorMessage = "Eesnimi on kohustuslik!";
        return false;
      }
      if (!this.formData.lastName) {
        this.errorMessage = "Perekonnanimi on kohustuslik!";
        return false;
      }
      if (!this.formData.phoneNumber) {
        this.errorMessage = "Telefoninumber on kohustuslik!";
        return false;
      }
      if (!/^\d+$/.test(this.formData.phoneNumber)) {
        this.errorMessage = "Telefoninumber peab sisaldama ainult numbreid!";
        return false;
      }
      return true;
    },

    handleSubmit() {
      if (this.validateForm()) {
        this.$emit("event-update-profile", this.formData);
        this.successMessage = "Andmed edukalt muudetud!";

        setTimeout(() => {
          this.successMessage = "";
          this.$emit("close");
        }, 4000);
      }
    },

    handleReset() {
      this.formData = { firstName: "", lastName: "", phoneNumber: "" };
      this.errorMessage = "";
      this.successMessage = "";
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
