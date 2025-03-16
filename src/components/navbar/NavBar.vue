<template>
  <div class="container text-center">
    <nav class="navbar navbar-expand-lg navbar-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-5 active">
            <router-link to="/lototron" class="nav-link">Lototron</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/createlunch" class="nav-link">Loo Lõuna</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/joinlunch" class="nav-link">Liitu Lõunaga</router-link>
          </li>
          <li class="nav-item me-5">
            <router-link to="/account" class="nav-link">Konto</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/restaurants" class="nav-link">Söögikohad</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/generator" class="nav-link">Küsimuste Generaator</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/messages" class="nav-link">
              Sõnumid
              <span v-if="unreadCount > 0" class="badge bg-danger">{{unreadCount}}</span>
            </router-link>
          </li>
          <li class="nav-item me-5">
            <button @click="logout" class="btn btn-danger action-button">Logi välja</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "@/router";
import MessageService from "@/services/MessageService";

export default {
  name: "NavBar",
  props: {
    isAdmin: Boolean,
  },
  data() {
    return {
      unreadCount: 0,
      messageInterval: null
    }
  },
  methods: {

    logout() {
      sessionStorage.clear();
      this.$emit("event-logout");
      router.push({name: "homeRoute"});
    },

    getUnreadMessageCount() {
      MessageService.sendGetUnreadMessageCountRequest()
          .then(response => this.handleGetUnreadMessageCountResponse(response))
          .catch(() => console.error('Ei saanud sõnumeid kätte'))
    },

    handleGetUnreadMessageCountResponse(response) {
      this.unreadCount = response.data
    }
  },

  beforeMount() {
    this.getUnreadMessageCount()

    this.messageInterval = setInterval(() => {
      this.getUnreadMessageCount()
    }, 60000)
  },

  beforeUnmount() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval)
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white !important;
  padding: 10px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.container {
  padding-top: 70px;
}

.navbar-nav .nav-link {
  font-size: 18px;
  color: black !important;
  font-weight: bold !important;
  padding: 10px 15px;
}

.navbar-nav .nav-link:hover {
  color: #dd5d0d !important;
}

.action-button {
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 5px;
}
</style>