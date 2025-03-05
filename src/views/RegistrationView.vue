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
        <span class="input-group-text">nimi</span>
        <input v-model="newUser.firstName" type="text" class="form-control">
      </div>

          <div class="input-group mb-3">
        <span class="input-group-text">perekonnanimi</span>
        <input v-model="newUser.lastName" type="text" class="form-control">
      </div>

          <div class="input-group mb-3">
        <span class="input-group-text">email</span>
        <input v-model="newUser.userName" type="text" class="form-control">
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
        firstName:'',
        lastName:'',
        userName: '',
        password: '',
        phoneNumber:'',
      }
    }
  },
  methods: {
    passwordNoMatch() {
      return this.passwordRetype !== this.newUser.password;
    },

    allFieldsWithCorrectInput() {
    return this.newUser.firstName.length > 0
        && this.newUser.lastName.length > 0
        && this.newUser.userName.length > 0
        && this.newUser.password.length > 0
        && this.passwordRetype.length> 0
        && this.newUser.phoneNumber.length > 0;
    },

    alertMissingFields() {
      this.errorMessage = "Täida kõik väljad"
      setTimeout(this.resetAlertMessage, 4000)
    },

    addNewUser() {
      if (!this.allFieldsWithCorrectInput()) {
        this.alertMissingFields();
        return;
      }

      if (this.passwordNoMatch()) {
        this.errorMessage = "Parool ei kattu";
        return;
      }

        UserService.sendPostNewUserRequest(this.newUser)
            .then(() => NavigationService.navigateToHomeView())
            .catch(() => NavigationService.navigateToErrorView());
    },

    resetAlertMessage() {
      this.errorMessage = '';
    }
  }
}
</script>

