<template>
  <div class="profile-image-container">

    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <img
        :src="displayImage"
        alt="Profiilipilt"
        class="profile-image"
        :class="{'fade-in': isImageLoaded, 'loading': isLoading}"
        @load="onImageLoad"
    />

    <div class="buttons-container">
      <button @click="changeProfilePicture" class="action-button">Muuda pilti</button>
      <button @click="deletePicture" class="action-button">Kustuta pilt</button>
      <button @click="navigateToErrorView" class="action-button">KUI RAINI ARVUTIS TOIMIB!</button>
    </div>
    <p v-if="statusMessage" class="status-message" :class="messageType">{{ statusMessage }}</p>

    <input type="file" ref="fileInput" @change="handleImage" style="display: none" accept="image/*" />
  </div>
</template>

<script>
import NavigationService from "@/services/NavigationService";

export default {
  name: "ProfileImage",

  props: {
    imageData: {
      type: String,
      default: ""
    },
    defaultImagePath: {
      type: String,
      default: "/defaultpicture.jpg"
    }
  },
  data() {
    return {
      profileImage: "",
      imageDataBase64: "", // Add this property
      isImageLoaded: false,
      isLoading: false,
      useDefaultImage: false,
      statusMessage: "", // Move these properties from props to data
      messageType: "info"
    };
  },

  computed: {
    displayImage() {
      if (this.useDefaultImage) {
        return this.defaultImagePath;
      }
      return this.imageDataBase64 || this.imageData || this.defaultImagePath;
    },


    hasProfileImage() {
      // Check if we have a real image (not the default)
      return (this.imageDataBase64 && this.imageDataBase64.startsWith('data:image')) ||
          (this.imageData && this.imageData.startsWith('data:image'));
    }


  },
  methods: {

    navigateToErrorView() {
      NavigationService.navigateToErrorView()
    },
    changeProfilePicture() {
      this.$refs.fileInput.click();
    },


    handleImage(event) {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        // Add file validation
        if (!this.validateImageFile(selectedImage)) {
          return;
        }
        this.convertToBase64(selectedImage);
      }
    },





    convertToBase64(fileObject) {
      this.isLoading = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataBase64 = reader.result;
        this.useDefaultImage = false; // Add this line
        this.$emit('event-profile-image-changed', this.imageDataBase64);
        this.isImageLoaded = false;
        // Use setTimeout to ensure the loading state is visible for a moment
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      };


      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.isLoading = false;
        alert('Viga pildi laadimisel. Palun proovige uuesti.');
      };
      reader.readAsDataURL(fileObject);
    },

    resetToDefault() {
      this.imageDataBase64 = "";
      this.useDefaultImage = true;
      this.isImageLoaded = true; // Change this to true to ensure the image displays

      // Force a re-render of the image by briefly setting the source to empty and then back
      setTimeout(() => {
        const img = document.querySelector('.profile-image');
        if (img) {
          // This forces the browser to reload the image
          img.src = '';
          setTimeout(() => {
            img.src = this.defaultImagePath;
          }, 10);
        }
      }, 0);
    },

    deletePicture() {
      if (!this.hasProfileImage) {
        // Show message if there's no profile picture
        this.statusMessage = "Teil pole profiilipilti üles laetud";
        this.messageType = "info";

        // Clear the message after 3 seconds
        setTimeout(() => {
          this.statusMessage = "";
        }, 3000);
        return;
      }

      // If there is an image, emit event to delete it
      this.imageDataBase64 = "";
      this.useDefaultImage = true;
      this.$emit('event-profile-image-changed', "", true); // Pass true as second parameter to indicate deletion
      this.isImageLoaded = false;

      // Show success message
      this.statusMessage = "Pilt on edukalt kustutatud";
      this.messageType = "success";

      // Clear the message after 3 seconds
      setTimeout(() => {
        this.statusMessage = "";
      }, 3000);
    },

    onImageLoad() {
      this.isImageLoaded = true;
    },


    validateImageFile(file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Palun valige pildi fail (JPEG, PNG, GIF, WEBP)');
        return false;
      }

      // Check file size (limit to 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Pilt on liiga suur. Maksimaalne suurus on 5MB.');
        return false;
      }

      return true;
    },
  },

  watch: {
    imageData: {
      immediate: true,
      handler(newVal) {
        if (newVal && !this.imageDataBase64) {
          this.imageDataBase64 = newVal;
          this.useDefaultImage = false;
        } else if (!newVal) {
          this.useDefaultImage = true;
        }
      }
    }
  }




}


</script>


<style scoped>

.status-message {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: center;
  transition: opacity 0.3s ease;
}

.info {
  background-color: #e7f3fe;
  color: #2c73b1;
  border: 1px solid #bad6f4;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 10px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 123, 255, 0.3);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.profile-image.loading {
  opacity: 0.5;
}

.profile-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  min-height: 300px; /* Set a minimum height */
}

.profile-image {
  width: 100%;
  max-width: 300px;
  height: 300px; /* Fixed height instead of auto */
  border-radius: 10px;
  object-fit: cover; /* This ensures the image covers the area properly */
  opacity: 1; /* Start with full opacity */
  transition: opacity 0.5s ease-in-out;
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
