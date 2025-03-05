<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col">
          <h1>Uue konto registreerimine</h1>
          <AlertDanger :message="errorMessage"/>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-3">

        <div class="input-group mb-3">
        <span class="input-group-text">email</span>
        <input v-model="newUser.username" type="text" class="form-control">
      </div>

        <div class="input-group mb-3">
        <span class="input-group-text">parool</span>
        <input v-model="newUser.password" type="password" class="form-control">
      </div>

        <div class="input-group mb-3">
        <span class="input-group-text">parool uuesti</span>
        <input v-model="passwordRetype" type="password" class="form-control">
      </div>

        <div class="input-group mb-3">
        <span class="input-group-text">telefon</span>
        <input v-model="newUser.phoneNumber" type="text" class="form-control">
      </div>

          <button @click="addNewUser" type="submit" class="btn-outline-success">Registreeri</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>



import AlertDanger from "@/components/alert/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import UserService from "@/services/UserService";

export default {
  name: "RegistrationView",
  components: {AlertDanger},
  data() {
    return {
      errorMessage: '',
      passwordRetype: '',
      newUser: {
        username: '',
        password: '',
        phoneNumber:'',
      }
    }
  },
  methods: {
    passwordNoMatch() {
      return this.passwordRetype !== this.newUser.password;
    },
    addNewUser() {
      if (this.passwordNoMatch()){
        this.errorMessage = "Parool ei kattu"
      } else {
        UserService.sendPostNewUserRequest(this.newUser)
            .then(() => NavigationService.navigateToHomeView())
            .catch(() => NavigationService.navigateToErrorView());
      }
    }
  }
}
</script>

