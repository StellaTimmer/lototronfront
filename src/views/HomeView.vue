<template>
  <div class="container text-center">
    <div class="row justify-content-center">

      <div class="col-4 justify-content-center">

        <div class="row">
          <h3>
            Tere tulemast lõunalototroni!<br>
            Ei tea kellega lõunale minna?
            Pole probleemi
            Aitame
          </h3>
        </div>

        <div class="row">
          <img src="@/assets/toidupilt3.jpg"
               height="100"
               width="100"
               class="img-fluid"
               alt="toidupilt">
        </div>

      </div>
      <div class="col col-3 ">

        <div class="col col-8">
          <AlertDanger :message="errorMessage"/>
        </div>

        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control">
        </div>
        <div>
          <button @click="login" type="submit" class="btn btn-primary me-3">Logi sisse</button>
          <button @click="navigateToRegisterView" type="submit" class="btn btn-secondary">Registreeri konto</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import router from "@/router";
import HttpStatusCodes from "@/errors/HttpStatusCodes";
import BusinessErrors from "@/errors/BusinessErrors";
import NavigationService from "@/services/NavigationService";


export default {
  name: 'HomeView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    login() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest();
      } else {
        this.alertMissingFields();
      }
    },


    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    handleLoginResponse(response) {
      // todo too ära count uutest kirjadest kasutaades userId,
      // todo arv emitttida ülesse
      this.loginResponse = response.data
      this.updateSessionStorageWithUserDetails();
      this.$emit('event-login')
      NavigationService.navigateToLototronView()
    },

    alertMissingFields() {
      this.errorMessage = 'Täida kõik väljad'
      setTimeout(this.resetAlertMessage, 4000)
    },

    updateSessionStorageWithUserDetails() {
      sessionStorage.setItem('userId', this.loginResponse.userId);
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    handleLoginErrorResponse(error) {
      this.errorResponse = error.response.data
      let httpStatusCode = error.response.status;

      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.handleIncorrectCredentialsAlert();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return HttpStatusCodes.STATUS_FORBIDDEN === httpStatusCode
          && BusinessErrors.CODE_INCORRECT_CREDENTIALS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentialsAlert() {
      this.errorMessage = this.errorResponse.message
      setTimeout(this.resetAlertMessage, 4000);
    },

    resetAlertMessage() {
      this.errorMessage = ''
    },

    navigateToRegisterView() {
      NavigationService.navigateToRegisterView()
    },

  }
}
</script>


