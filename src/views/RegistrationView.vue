<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col">
          <h1>Uue konto registreerimine</h1>
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-6">

          <div class="input-group mb-3">
            <span class="input-group-text">nimi</span>
            <input v-model="newUser.firstName" type="text" class="form-control">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">perekonnanimi</span>
            <input v-model="newUser.lastName" type="text" class="form-control">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">kasutajanimi</span>
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

          <button @click="addNewUser" type="submit" class="btn btn-primary">Registreeri</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>


import AlertDanger from "@/components/alert/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import UserService from "@/services/UserService";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "RegistrationView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      errorMessage: '',
      successMessage: '',
      passwordRetype: '',
      newUser: {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        phoneNumber: '',
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
          && this.passwordRetype.length > 0
          && this.newUser.phoneNumber.length > 0;
    },

    alertMissingFields() {
      this.errorMessage = "Täida kõik väljad"
      setTimeout(this.resetAlertMessage, 4000)
    },

    handleAddNewUserResponse() {
      this.successMessage = "Oled registreeritud, suuname pealehele!";
      setTimeout(() => {
        NavigationService.navigateToHomeView();
      }, 3000);
    },

    addNewUser() {
      if (!this.allFieldsWithCorrectInput()) {
        this.alertMissingFields();
      } else if (this.passwordNoMatch()) {
        this.errorMessage = "Parool ei kattu";
      } else {
        UserService.sendPostNewUserRequest(this.newUser)
            .then(() => this.handleAddNewUserResponse())
            .catch((error) => {
              if (error.response && error.response.status === 409) {
                this.errorMessage = "Kasutaja on juba olemas";
              } else {
                if (!this.allFieldsWithCorrectInput()) {
                  this.alertMissingFields();
                } else if (this.passwordNoMatch()) {
                  this.errorMessage = "Parool ei kattu";
                } else {
                  UserService.sendPostNewUserRequest(this.newUser)
                      .then(() => this.handleAddNewUserResponse())
                      .catch((error) => {
                        if (error.response && error.response.status === 405) {
                          this.errorMessage = "Kasutaja on juba olemas";
                        } else {
                          NavigationService.navigateToErrorView();
                        }
                      });
                }
              }
                NavigationService.navigateToErrorView();

      });
      }
    },

    resetAlertMessage() {
      this.errorMessage = '';
    }
  }
}

</script>

