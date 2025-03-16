<template>
  <div>
    <div class="container">
      <div class="row mt-3 mb-3">
        <div class="col">
          <h3>Sõnumid</h3>
          <AlertSuccess :message="successMessage"/>
          <AlertDanger :message="errorMessage"/>
        </div>
      </div>

      <div class="row message-container">
        <div class="col-md-4 message-list-col">
          <MessageList
              :messages="messages"
              :selected-message-id="selectedMessageId"
              @event-message-selected="selectMessage"
          />
        </div>
        <div class="col-md-8 message-detail-col">
          <MessageDetail
              v-if="selectedMessage"
              :message="selectedMessage"
          />
          <div v-else class="no-message-selected">
            <p>Vali sõnum vasakust nimekirjast</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageList from '@/components/message/MessageList.vue'
import MessageDetail from '@/components/message/MessageDetail.vue'
import AlertSuccess from '@/components/alert/AlertSuccess.vue'
import AlertDanger from '@/components/alert/AlertDanger.vue'
import MessageService from '@/services/MessageService'
import NavigationService from '@/services/NavigationService'

export default {
  name: 'MessagesView',
  components: {
    MessageList,
    MessageDetail,
    AlertSuccess,
    AlertDanger
  },
  data() {
    return {
      messages: [],
      selectedMessageId: 0,
      successMessage: '',
      errorMessage: ''
    }
  },
  computed: {
    selectedMessage() {
      return this.messages.find(message => message.messageId === this.selectedMessageId) || null
    }
  },
  methods: {
    getMessages() {
      MessageService.sendGetUserMessagesRequest()
          .then(response => this.handleGetMessagesResponse(response))
          .catch(() => {
            this.errorMessage = 'Sõnumite laadimine ebaõnnestus'
            setTimeout(this.resetAllMessages, 4000)
          })
    },

    handleGetMessagesResponse(response) {
      this.messages = response.data
    },

    selectMessage(messageId) {
      this.selectedMessageId = messageId

      const message = this.messages.find(m => m.messageId === messageId)
      if (message && message.state === 'N') {
        this.markMessageAsRead(messageId)
      }
    },

    markMessageAsRead(messageId) {
      MessageService.sendMarkMessageAsReadRequest(messageId)
          .then(() => this.handleMarkMessageAsReadResponse(messageId))
          .catch(() => {
            this.errorMessage = 'Sõnumi märkimine loetuks ebaõnnestus'
            setTimeout(this.resetAllMessages, 4000)
          })
    },

    handleMarkMessageAsReadResponse(messageId) {
      const message = this.messages.find(m => m.messageId === messageId)
      if (message) {
        message.state = 'R'
      }
      this.$root.refreshMessages()

    },

    resetAllMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    }
  },
  beforeMount() {
    this.getMessages()
  }
}
</script>

<style scoped>
.message-container {
  height: 70vh;
}

.message-list-col, .message-detail-col {
  height: 100%;
}

.no-message-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
}
</style>