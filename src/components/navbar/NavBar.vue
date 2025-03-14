<template>

  <div class="container text-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-5 active ">
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
          <li class="nav-item me-5">
            <router-link to="/restaurants" class="nav-link">Söögikohad</router-link>
          </li>
          <li class="nav-item me-4">
            <router-link to="/generator" class="nav-link">Küsimuste Generaator</router-link>
          </li>
          <li class="nav-item me-5">
            <button @click="logout" class="btn btn-danger action-button red">Logi välja</button>
          </li>
        </ul>
      </div>
    </nav>
</div>


</template>



<script>
export default {
  name: "NavBar",

  methods: {
    logout() {
      sessionStorage.clear()
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
  }
}

</script>


<style scoped>

.navbar {
  background-color: transparent !important;
  padding: 10px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Customize Navbar Links */
.navbar-nav .nav-link {
  font-size: 18px;
  color: black !important;
  font-weight: bold !important;
  padding: 10px 15px;
}

.navbar-nav .nav-link:hover {
  color: white !important;
}

/* Logout Button */
.action-button {
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 5px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}

</style>