<template>
  <div class="container text-center">

    <div class="row my-4">
      <div class="col-md-6">
        <ProfileImage
            ref="profileImage"
            :imageData="userData.imageData"
            :defaultImagePath="'/defaultpicture.jpg'"
            @event-profile-image-changed="setUserDataImageData"
        />
      </div>
      <div class="col">

        <img src="/settingspicture.jpg" alt="ProfileSettingPicture" class="profile-image">

        <div class="buttons-container">
          <button @click="isEditProfileModal = true" class="action-button yellow">Muuda andmeid</button>
        </div>
        <div class="buttons-container my-3">
          <button @click="openChangePasswordModal" class="action-button yellow">Vaheta parool</button>
        </div>

        <div class="buttons-container">
          <button @click="isDeleteAccountModal = true" class="action-button delete-button">Kustuta konto</button>
        </div>

      </div>


    </div>


    <ChangePasswordModal
        v-if="isChangePasswordModal"
        :is-modal-open="isChangePasswordModal"
        @close="isChangePasswordModal = false"
        @submit="updatePassword"
    />
    <ChangeDataModal
        :isModalOpen="isEditProfileModal"
        :currentUserData="userData"
        @event-firstName-changed="setUserDataFirstName"
        @event-lastName-changed="setUserDataLastName"
        @event-phoneNumber-changed="setUserDataPhoneNumber"
        @event-update-profile="updateUserData"
        @close="closeModal"
    />
    <DeleteAccountModal
        v-if="isDeleteAccountModal"
        :modalIsOpen="isDeleteAccountModal"
        @event-close-modal="isDeleteAccountModal = false"
        @confirm="handleDeleteAccount"
    />
  </div>
</template>

<script>
import ProfileImage from "@/components/account/ProfileImage.vue";
import ChangeDataModal from "@/components/modal/ChangeDataModal.vue";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal.vue";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal.vue";
import NavigationService from "@/services/NavigationService";
import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";


export default {
  name: "AccountView",
  components: {
    ProfileImage,
    ChangeDataModal,
    ChangePasswordModal,
    DeleteAccountModal,
  },
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),

      userData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        imageData: ''
      },

      isEditProfileModal: false,
      isChangePasswordModal: false,
      isDeleteAccountModal: false,
    };
  },
  methods: {


    setUserDataImageData(imageData, isDelete = false) {
      this.userData.imageData = imageData;
      // Optional: automatically update the profile when image changes
      if (isDelete) {
        this.deleteProfileImage();
      } else if (imageData) {
        this.updateUserDataWithImage();
      }
    },

    deleteProfileImage() {
      const profileImageRef = this.$refs.profileImage;

      ProfileService.sendDeleteProfileImageRequest(this.userId)
          .then(() => {
            this.successMessage = "Profiilipilt on edukalt kustutatud";

            // Update the userData to reflect the deleted image
            this.userData.imageData = "";

            // If we have a reference to the component, explicitly reset to default
            if (profileImageRef) {
              profileImageRef.resetToDefault();
            }

            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.errorMessage = "Viga pildi kustutamisel. Palun proovige uuesti.";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          });
    },

    updateUserDataWithImage() {
      this.successMessage = "Pildi laadimine...";
      ProfileService.sendUpdateProfileRequest(this.userId, this.userData)
          .then(() => {
            this.successMessage = "Pilt on edukalt uuendatud!";
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.errorMessage = "Viga pildi salvestamisel. Palun proovige uuesti.";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          });
    },

    updateUserDataWithoutImage() {
      this.successMessage = "Pildi eemaldamine...";
      ProfileService.sendUpdateProfileRequest(this.userId, this.userData)
          .then(() => {
            this.successMessage = "Pilt on edukalt eemaldatud!";
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.errorMessage = "Viga pildi eemaldamisel. Palun proovige uuesti.";
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          });
    },

    setUserDataFirstName(firstName) {
      this.userData.firstName = firstName
    },

    setUserDataLastName(lastName) {
      this.userData.lastName = lastName
    },

    setUserDataPhoneNumber(phoneNumber) {
      this.userData.phoneNumber = phoneNumber
    },


    handleGetUserDataResponse(response) {
      this.userData = response.data;
    },

    getUserData() {
      ProfileService.sendGetProfileRequest(this.userId)
          .then(response => this.handleGetUserDataResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    logout() {
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },

    handleDeleteAccount() {
      console.log('Konto kustutatud');
      setTimeout(() => {
        this.isDeleteAccountModal = false;
        NavigationService.navigateToHomeView();
      }, 1000);
    },

    updateUserData(formData) {
      ProfileService.sendUpdateProfileRequest(this.userId, formData)
          .then(() => {
            this.handleGetUserDataResponse();
            this.isEditProfileModal = false;
          })
          .catch(() => {});
    },

    updatePassword(passwordData) {
      // Create the password change object that matches the backend DTO
      const passwordChange = {
        userId: this.userId,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      };

      // Call the service to send the request
      UserService.sendChangePasswordRequest(passwordChange)
          .then(() => {
            console.log("Parool edukalt muudetud");
            // You could add success message handling here if needed
          })
          .catch(error => {
            console.error("Parooli muutmine ebaõnnestus:", error);
            // You could add error handling here if needed
          });
    },

    openChangePasswordModal() {
      this.isChangePasswordModal = true;
    },
    closeModal() {
      this.isEditProfileModal = false;
      this.isChangePasswordModal = false;
    },
  },
  beforeMount() {
    this.getUserData()
  }
};
</script>

<style scoped>

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}


.action-button.yellow {
  background-color: #007bff;
  color: white;
}

.action-button.yellow:hover {
  background-color: #007bff;
}

.action-button.red {
  background-color: #dc3545;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.profile-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}
</style>
