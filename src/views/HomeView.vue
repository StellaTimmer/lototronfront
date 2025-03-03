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
      <div class="col col-3 ">

        <div class="mb-3">
          <label class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control">
        </div>
        <div>
          <button type="submit" class="btn btn-primary me-3">Logi sisse</button>
          <button type="submit" class="btn btn-secondary">Registreeri konto</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HomeView',
  data() {
    return {
      username: '',
      password: '',

    }
  },
  methods: {

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

    login() {
      if (this.allFieldsWithCorrectInput()) {
        axios.get('',this.username, this.password)
            .then(response => this.handleLoginResponse = response.data)
            .catch(error => this.handleLoginErrorResponse = error.response.data)

      }


    },

  }

}
</script>
