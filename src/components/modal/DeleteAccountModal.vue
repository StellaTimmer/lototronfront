<template>
  <div v-if="modalIsOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Kustuta konto</h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div v-if="successMessage" class="alert-success">
            {{ successMessage }}
          </div>

          <h2 style="color: red">Oled kindel, et soovid oma konto kustutada?</h2>
          <p>Konto kustutamisel kaotad kõik oma andmed ja seaded.</p>
        </div>
        <div class="modal-footer mt-3">
          <button type="button" class="btn btn-secondary me-2" @click="closeModal">Sulge</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Kustuta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteAccountModal",
  props: {
    modalIsOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      successMessage: ""
    };
  },
  methods: {
    closeModal() {
      this.successMessage = "";
      this.$emit('event-close-modal');
    },
    confirmDelete() {
      this.successMessage = "Konto edukalt kustutatud!";

      setTimeout(() => {
        this.$emit('confirm');
        this.closeModal();
      }, 2000);
    }
  }
};
</script>

<style scoped>
.alert-success {
  color: white;
  background-color: green;
  padding: 10px;
  border-color: green;
  margin-bottom: 15px;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
}

.btn-close {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.modal-body {
  margin-bottom: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}
</style>
