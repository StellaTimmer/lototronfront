<template>

  <div>
    <NavBar />
    <router-view />
  </div>


  <div class="container text-center enlarged">


    <div class="d-flex justify-content-evenly">

      <div class="col md-1">
        <button @click="navigateToCreateLunchView" type="button" class="btn btn-warning big-button mt-5">Loo lõuna</button>

        <button @click="navigateToJoinLunchView" type="button" class="btn btn-warning big-button mt-5">Liitu lõunaga</button>
      </div>



      <div class="row my-4">
        <div class="col-md-1"></div>
        <div class="col-md-3 enlarged">
          <a href="https://rotermann.ee/tana-lounaks/" target="_blank" class="ad-link">
            <img src="/rotermann.png" height="225" width="225" alt="Reklaam 1" class="ad-banner"/>
          </a>
          <a href="https://xn--pevapakkumised-5hb.ee/tallinn/" target="_blank" class="ad-link">
            <img src="/paevapakkumised.jpg" alt="Reklaam 2" class="ad-banner"/>
          </a>
          <a href="https://www.lhv.ee/et/terviselaen/" target="_blank" class="ad-link">
            <img src="/RTBbanner.jpg" alt="Reklaam 3" class="ad-banner"/>
          </a>
        </div>
      </div>


    </div>
  </div>


</template>


<script>
import NavigationService from "@/services/NavigationService";
import NavBar from "@/components/navbar/NavBar.vue";

export default {
  name: "LototronView",
  components: {
    NavBar,
  },

  data() {
    return {}
  },


  methods: {


    navigateToCreateLunchView() {
      NavigationService.navigateToCreateLunchView();
    },


    navigateToJoinLunchView() {
      NavigationService.navigateToJoinLunchView();
    },
  }

}


</script>


<style scoped>

.big-button {
  font-size: 40px; /* Increase text size */
  padding: 40px 100px; /* Adjust padding */
  border-radius: 20px; /* Optional: smoother edges */
}

.enlarged {
  width: 1000px; /* Adjust as needed */
  height: 200px;
}

.ad-banner {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.ad-banner:hover {
  transform: scale(1.05);
}

.ad-link {
  display: block;
  margin-bottom: 15px;
}



</style>