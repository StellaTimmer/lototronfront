<template>

  <div class="container text-center enlarged">


    <div class="col-10">


      <div class="col mt-5">
        <a href="https://faculty.washington.edu/ejslager/random-generator/index.html"
           class="btn btn-warning big-button mt-5"
           role="button">
          Küsimuste generaator
        </a>
      </div>


    </div>
  </div>

</template>


<script>
import NavBar from "@/components/navbar/NavBar.vue";


export default {
  name: "QuestionsGenerator",
  components: {
    NavBar,
  },

  data() {
    return {}
  },


  methods: {}

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