<template>
  <div class="profile-image-container">
    <img
        :src="profileImage || '/defaultpicture.jpg'"
        alt="Profiilipilt"
        class="profile-image"
        :class="{'fade-in': isImageLoaded}"
        @load="onImageLoad"
    />

    <div class="buttons-container">
      <button @click="changeProfilePicture" class="action-button">Muuda pilti</button>
      <button @click="uploadPicture" class="action-button">Lisa pilt</button>
      <button @click="deletePicture" class="action-button">Kustuta pilt</button>
    </div>

    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
  </div>
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      profileImage: "",
      isImageLoaded: false,
    };
  },
  methods: {
    changeProfilePicture() {
      this.$refs.fileInput.click();
    },

    uploadPicture() {
      this.$refs.fileInput.click();
    },

    deletePicture() {
      if (this.profileImage) {
        this.profileImage = "";
        this.isImageLoaded = false;
      }
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
          this.isImageLoaded = false;
        };
        reader.readAsDataURL(file);
      }
    },

    onImageLoad() {
      this.isImageLoaded = true;
    },
  },
};
</script>


<style scoped>

.profile-image-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}


.profile-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}


.profile-image.fade-in {
  opacity: 1;
}


.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
