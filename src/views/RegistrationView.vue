<template>
  <div class="registration">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col">
          <RegistrationForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import RegistrationForm from "@/components/RegistrationForm.vue";

export default {
  name: "RegistrationForm",
  components: {
    RegistrationForm
  }
};
</script>

