<template>
<div class="modal">
  <div class="modal-content">
    <h2>Vaheta parool</h2>
    <input type="password" v-model="oldPassword" placeholder="Praegune parool" />
    <input type="password" v-model="newPassword" placeholder="Uus parool" />
    <button @click="changePassword">Salvesta</button>
    <button @click="$emit('close')">Sulge</button>
  </div>
</div>
</template>

<script>
export default {
name: "ChangePasswordModal",
  data() {
  return {
    oldPassword: "",
    newPassword: ""
  };
  },
  methods: {
  changePassword() {
    if(!this.oldPassword || !this.newPassword) {
      alert("Palun täida mõlemad väljad!");
      return;
    }
    alert("Parool muudetud edukalt!");
    this.emit("close");
  }
  }
};
</script>


