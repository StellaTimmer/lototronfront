<template>

  <div>
    <nav>
      <MainMenu v-if="isLoggedIn" @logout="handleLogout"/>
      <router-view @login="handleLogin"/>
    </nav>

  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";

export default {
  components: {
    MainMenu
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    },
    handleLogout() {
      this.isLoggedIn = false;
    }
  }
};
</script>