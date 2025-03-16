<template>
  <div class="message-detail">
    <div class="message-detail-header">
      <h5>{{ message.subject }}</h5>
      <div class="message-info">
        <span class="sender">From: {{ message.senderName }}</span>
      </div>
    </div>
    <div class="message-detail-body">
      {{ message.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.message-detail {
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100%;
}

.message-detail-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: #f8f9fa;
}

.message-detail-header h5 {
  margin: 0 0 10px 0;
}

.message-info {
  color: #666;
  font-size: 0.9em;
}

.message-detail-body {
  padding: 15px;
  white-space: pre-line;
}
</style>