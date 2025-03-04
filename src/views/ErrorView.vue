<template>

  <div class="container text-center">
    <div>
      <AlertDanger message=" Midagi läks valesti, sry." />
    </div>

    <div>
      <img src="../assets/talking-burger-good-burger-2.gif" height="200" width="200"/>
    </div>
  </div>




</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "ErrorView",
  components: {AlertDanger}
}
</script>



