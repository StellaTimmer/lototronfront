<template>
  <div class="container text-center">
    <div class="row">


      <div class="col-4 justify-content-center">

        <div class="row">
          <p>
            Tere tulemast lõunalototroni!
            Ei tea kellega lõunale minna?
            Pole probleemi
            Aitame
          </p>
        </div>

        <div class="row">
          <img src="@/assets/toidupilt3.jpg"
               height="100"
               width="100"
               class="img-fluid"
               alt="toidupilt">
        </div>

      </div>
      <div  class="col col-3 "> //v-if="false"

        <div class="col col-8" >
          <AlertDanger :message="message" />
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
          <button type="submit" class="btn btn-secondary">Registreeri konto</button>
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


export default {
  name: 'HomeView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      message: '',
      loginResponse: {
        userId: 0,
        roleName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods: {

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

    alertMissingFields() {
      this.message = "Täida kõik väljad"
      setTimeout(this.resetAlertMessage, 4000)
    }, login() {
      if (this.allFieldsWithCorrectInput()) {
        LoginService.sendLoginRequest(this.username, this.password)
            .then(response => this.handleLoginResponse = response.data)
            .catch(error => this.handleLoginErrorResponse = error.response.data)

      } else {
        this.alertMissingFields();
      }

    },
    handleLoginResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId);
      sessionStorage.setItem('roleName', this.loginResponse.roleName);
      router.push({name: 'lototronRoute'})

    },
    isIncorrectCredentials(httpStatusCode) {
      return HttpStatusCodes.STATUS_FORBIDDEN === httpStatusCode
          && BusinessErrors.CODE_INCORRECT_CREDENTIALS === this.errorResponse.errorCode;

    }, handleIncorrectCredentialsAlert() {
      this.message = this.errorResponse.message
      setTimeout(this.resetAlertMessage, 4000);

    }, handleLoginErrorResponse(error) {
      this.errorResponse = error.response.data
      let httpStatusCode = error.response.status;

      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.handleIncorrectCredentialsAlert();
      } else {
        router.push({name: 'errorRoute'})

      }

      }

    },
  resetAlertMessage() {
    this.message = ''
  }



}
</script>
