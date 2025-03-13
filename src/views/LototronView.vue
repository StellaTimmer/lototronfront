<template>
  <div class="container text-center enlarged">


    <div class="col-10">

      <div class="col mt-5">
        <button @click="navigateToCreateLunchView" type="button" class="btn btn-warning big-button mt-5">Loo lõuna</button>

      </div>

      <div class="col">

        <button @click="navigateToJoinLunchView" type="button" class="btn btn-warning big-button mt-5">Liitu lõunaga</button>
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
  padding: 30px 80px; /* Adjust padding */
  border-radius: 20px; /* Optional: smoother edges */
}

.enlarged {
  width: 1000px; /* Adjust as needed */
  height: 150px;
}


</style>