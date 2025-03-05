<template>
  <div class="registration">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col">
          <h4>Uue konto registreerimine</h4>
        </div>
        <div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Parool</label>
            <input v-model="password" type="password" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Parool uuesti</label>
            <input v-model="confirmPassword" type="password" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Telefon</label>
            <input v-model="phone" type="tel" class="form-control">
          </div>

          <button @click="register" type="submit" class="btn btn-primary">Registreeri</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'RegistrationForm',
  data(){
    return{
      email:'',
      password:'',
      confirmPassword:'',
      phone:'',
      errorMessage:'',
      successMessage:'',
    };
  },
  methods:{
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Paroolid ei kattu!';
        return;
      }
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          email: this.email,
          password: this.password,
          phoneNumber: this.phone,
        });
        this.successMessage = response.data;
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error; "Registreerimine ebaõnnestus";
        this.successMessage = '';
      }
    }
  }
};
</script>



