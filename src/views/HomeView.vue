<template>
  <div class="container text-center mt-5">
    <div class="row justify-content-center mt-5">
      <div class="col-4 justify-content-center">
        <div class="row">
          <h3>
            Tere tulemast lõunalototroni!<br>
            Ei tea kellega lõunale minna?
            Pole probleemi.
            Aitame!
          </h3>
        </div>
      </div>
      <div class="col col-3 " v-if="!isLoggedIn">
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
          <button @click="login" type="submit" class="btn btn-warning me-3">Logi sisse</button>
          <button @click="navigateToRegisterView" type="submit" class="btn btn-secondary">Registreeri konto</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import HttpStatusCodes from "@/errors/HttpStatusCodes";
import BusinessErrors from "@/errors/BusinessErrors";
import NavigationService from "@/services/NavigationService";
import axios from 'axios';

export default {
  name: 'HomeView',
  components: { AlertDanger },
  data() {
    return {
      isLoggedIn: false,
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
  mounted() {
    this.checkSession();
  },
  methods: {
    checkSession() {
      axios.get("/check-session")
          .then(response => {
            this.isLoggedIn = response.data;
            if (this.isLoggedIn) {
              this.$router.replace("/lototron"); // Kui kasutaja on sees, suuna kohe edasi
            }
          })
          .catch(() => {
            this.isLoggedIn = false;
          });
    },

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
      this.loginResponse = response.data;
      this.updateSessionStorageWithUserDetails();
      this.$emit('event-login');
      NavigationService.navigateToLototronView();
    },

    alertMissingFields() {
      this.errorMessage = 'Täida kõik väljad';
      setTimeout(this.resetAlertMessage, 4000);
    },

    updateSessionStorageWithUserDetails() {
      sessionStorage.setItem('userId', this.loginResponse.userId);
      sessionStorage.setItem('roleName', this.loginResponse.roleName);
    },

    handleLoginErrorResponse(error) {
      this.errorResponse = error.response.data;
      let httpStatusCode = error.response.status;

      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.handleIncorrectCredentialsAlert();
      } else {
        NavigationService.navigateToErrorView();
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return HttpStatusCodes.STATUS_FORBIDDEN === httpStatusCode
          && BusinessErrors.CODE_INCORRECT_CREDENTIALS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentialsAlert() {
      this.errorMessage = this.errorResponse.message;
      setTimeout(this.resetAlertMessage, 4000);
    },

    resetAlertMessage() {
      this.errorMessage = '';
    },

    navigateToRegisterView() {
      NavigationService.navigateToRegisterView();
    },
  }
}
</script>
