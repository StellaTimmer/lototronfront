<template>

  <div>

    <div class="container text-center">
      <div class="row justify-content-center">
        <NavBar v-if="true" @logout="handleLogout"/>
      </div>

      <div class="row justify-content-center">
        <div class="col col-8">
          <router-view @login="handleLogin"/>
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
import '@/assets/css/banner.css'


export default {
  components: {
    Banner,
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