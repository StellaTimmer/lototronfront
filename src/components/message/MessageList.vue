<template>
  <div>
    <div v-if="messages.length === 0" class="alert alert-info">
      Sul pole sõnumeid
    </div>

    <div v-else class="message-list">
      <div v-for="message in messages"
           :key="message.messageId"
           class="message-item"
           :class="{'unread': message.state === 'N'}"
           @click="handleMessageClick(message.messageId)">

        <div class="message-header">
          <span class="message-subject">{{ message.subject }}</span>
          <span class="message-sender">{{ message.senderName }}</span>
        </div>
        <div class="message-preview">
          {{ truncateMessageBody(message.body) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    selectedMessageId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleMessageClick(messageId) {
      this.$emit('event-message-selected', messageId)
    },

    truncateMessageBody(body) {
      if (!body) return ''
      return body.length > 60 ? body.substring(0, 60) + '...' : body
    }
  }
}
</script>

<style scoped>
.message-list {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.message-item:hover {
  background-color: #f5f5f5;
}

.message-item.unread {
  background-color: #f0f7ff;
  font-weight: bold;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-subject {
  font-weight: bold;
}

.message-sender {
  color: #666;
  font-size: 0.9em;
}

.message-preview {
  color: #555;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>