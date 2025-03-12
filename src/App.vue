<template>

  <div>

    <div>
      <NavBar v-if="isLoggedIn" @logout="handleLogout"/>
      <router-view @login="handleLogin"/>
    </div>


  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
import NavBar from "@/components/navbar/NavBar.vue";

export default {
components: {
  NavBar,
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