<template>


  <div class="container text-center">


    <div class="d-flex justify-content-center">

      <div class="col col-4">
        <br>
        <br>
        <br>
        <br>
        <button @click="navigateToCreateLunchView" type="button" class="btn btn-warning btn-lg" >Loo lõuna</button>
        <br>
        <br>
        <br>
        <br>
        <button @click="navigateToJoinLunchView" type="button" class="btn btn-warning btn-lg">Liitu lõunaga</button>


        <!--      -->

        <!--        <div class="card">-->
        <!--          <div class="card-body">-->
        <!--            Liitu lõunaga-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <button type="Loo lõuna" class="form-control"> </button>-->
        <!--        <button type="Liitu lõunaga" class="form-control"> </button>-->
      </div>

      <div class="col">
        Siia tulevad reklaamid
      </div>

    </div>
  </div>


</template>


<script>
import NavigationService from "@/services/NavigationService";
import router from "@/router";

export default {
  name: "LototronView",

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


