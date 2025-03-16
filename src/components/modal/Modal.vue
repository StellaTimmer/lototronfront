<template>
  <div>
    <!-- Modal -->
    <div v-if="modalIsOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close" @click="$emit('event-close-modal')" aria-label="Close"/>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="btn btn-secondary me-2" @click="$emit('event-close-modal')">Sulge</button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    modalIsOpen: Boolean
  }
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
  z-index: 1050;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  max-width: 95%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content {
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
</style>

