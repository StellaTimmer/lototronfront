<template>
  <div :class="backgroundClass">
    <div class="container text-center">

      <!-- Näita Navbar ainult siis, kui kasutaja on sisse logitud -->
      <div class="row justify-content-center">
        <NavBar v-if="isLoggedIn" :is-admin="isAdmin" @event-logout="logout"/>
      </div>

      <div class="row justify-content-center">
        <div class="col col-8">
          <router-view @event-login="login"/>
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
      let userId = sessionStorage.getItem('userId');
      this.isLoggedIn = userId !== null;

      let roleName = sessionStorage.getItem('roleName');
      this.isAdmin = roleName === 'admin';
    },

    // ✅ Meetod sisselogimiseks (kasutatakse router-view kaudu)
    login() {
      sessionStorage.setItem('userId', '12345'); // Testi jaoks fikseeritud väärtus
      this.updateNavMenu(); // Kontrollib ja uuendab olekut
    },

    // ✅ Meetod väljalogimiseks (käivitatakse NavBarist)
    logout() {
      sessionStorage.clear();
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  },
  mounted() {
    this.updateNavMenu(); // Kontrollib, kas kasutaja on juba sisse logitud
  }
};
</script>
