<template>
  <div :class="backgroundClass">
    <div class="container text-center">
      <div class="row justify-content-center">
        <NavBar
            ref="navBar"
            v-if="isLoggedIn"
            :is-admin="isAdmin"
            @event-logout="updateNavMenu"
        />
      </div>

      <div class="row justify-content-center">
        <div class="col col-8">
          <router-view @event-login="updateNavMenu"/>
        </div>
        <div class="col col-4">
          <Banner/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
import NavBar from "@/components/navbar/NavBar.vue";
import Banner from "@/components/navbar/Banner.vue";
import '@/assets/css/banner.css';
import '@/assets/css/background.css';

export default {
  components: {
    Banner,
    NavBar,
    MainMenu
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },

  computed: {
    backgroundClass() {
      return this.isLoggedIn ? "background-logged-in" : "background-logged-out";
    }
  },

  methods: {
    updateNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      let roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName != null && 'admin' === roleName
    },
    refreshMessages() {
      if (this.$refs.navBar) {
        this.$refs.navBar.getUnreadMessageCount()
      }
    }
  },

  mounted() {
    this.updateNavMenu()

    this.$root.refreshMessages = this.refreshMessages

  },

  provide() {
    return {
      refreshMessages: this.refreshMessages
    }
  }
}
</script>