<template>
<div class="modal">
  <div class="modal-content">
    <h2>Muuda andmeid</h2>
    <input v-model="name" type="text" placeholder="Uus nimi"/>
    <button @click="saveChanges">Salvesta</button>
    <button @click="$emit('close')">Sulge</button>
  </div>
</div>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    saveChanges() {
      alert("Andmed on salvestatud:" +this.name);
      this.$emit("close");
    }
  }
};
</script>

