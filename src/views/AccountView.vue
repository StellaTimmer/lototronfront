<template>
  <div class="container text-center">

    <div class="row my-4">
      <div class="col-md-6">
        <ProfileImage/>

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
      },

      isEditProfileModal: false,
      isChangePasswordModal: false,
      isDeleteAccountModal: false,
    };
  },
  methods: {
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
      return this.userData = response.data;
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
    updateUserData() {
      ProfileService.sendUpdateProfileRequest(this.userId, this.userData)
          .then(response => {
            this.handleGetUserDataResponse(response);
            this.isEditProfileModal = false;
          })
          .catch(() => {});
    },

    updatePassword(passwordData) {
      console.log("Muudetud parool:", passwordData);

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
