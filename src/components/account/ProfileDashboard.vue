<template>
  <div class="container text-center">
    <!-- Peamenüü riba -->
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <!-- Logo -->
          <a class="navbar-brand" href="#">
            <img src="../../assets/lototronlogo.jpg" alt="Logo" class="logo" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Lototron</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Loo Lõuna</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Liitu Lõunaga</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Konto</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Söögikohad</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Küsimuste Generaator</a>
              </li>
              <!-- Logi välja nupp -->
              <li class="nav-item">
                <button @click="logout" class="btn btn-danger">Logi välja</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>


    <div class="row my-4">
      <div class="col-md-6">

        <div class="profile-image-container">
          <img :src="profileImage" alt="Profiilipilt" class="profile-image" />
        </div>
        <div class="buttons-container">
          <button @click="changeProfilePicture" class="action-button">Muuda pilti</button>
          <button @click="uploadPicture" class="action-button">Lisa pilt</button>
          <button @click="deletePicture" class="action-button">Kustuta pilt</button>
        </div>
      </div>

      <div class="col-md-6">

        <a href="https://rotermann.ee/tana-lounaks/" target="_blank" class="ad-link">
          <img src="/ad1.jpg" alt="Reklaam 1" class="ad-banner"/>
        </a>
        <a href="https://xn--pevapakkumised-5hb.ee/tallinn/" target="_blank" class="ad-link">
          <img src="/ad2.jpg" alt="Reklaam 2" class="ad-banner"/>
        </a>
        <a href="https://www.lhv.ee/et/terviselaen/" target="_blank" class="ad-link">
          <img src="/ad3.jpg" alt="Reklaam 3" class="ad-banner"/>
        </a>
      </div>
    </div>


    <div class="row">
      <div class="col">
        <button @click="isEditProfileModal = true" class="action-button">Muuda andmeid</button>
      </div>
      <div class="col">
        <button @click="isChangePasswordModal = true" class="action-button">Vaheta parool</button>
      </div>
      <div class="col">
        <button @click="isDeleteAccountModal = true" class="action-button delete-button">Kustuta konto</button>
      </div>
    </div>


    <EditProfileModal v-if="isEditProfileModal" @close="isEditProfileModal = false"/>
    <ChangePasswordModal v-if="isChangePasswordModal" @close="isChangePasswordModal = false"/>
    <DeleteAccountModal v-if="isDeleteAccountModal" @close="isDeleteAccountModal = false" @confirm="handleDeleteAccount"/>
  </div>
</template>

<script>
import EditProfileModal from "@/components/modal/EditProfileModal.vue";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal.vue";
import DeleteAccountModal from "@/components/account/ProfileDashboard.vue";
import axios from "axios";


export default {
  name: "AccountView",
  components: {
    EditProfileModal,
    ChangePasswordModal,
    DeleteAccountModal
  },
  data() {
    return {
      profileImage: "default-profile.png",
      isEditProfileModal: false,
      isChangePasswordModal: false,
      isDeleteAccountModal: false,
      accountDeletedMessage: ''
    };
  },
  methods: {
    changeProfilePicture() {
      alert("Profiilipildi muutmise funktsioon käivitatud");
    },
    uploadPicture() {
      alert("Pilt lisatud!");
    },
    deletePicture() {
      alert("Pilt kustutatud!");
    },
    handleDeleteAccount() {
      axios
          .delete("api/account/delete")
          .then(() => {
            this.isDeleteAccountModal = false;
            this.accountDeletedMessage = "Konto kustutati edukalt!";
          })
          .catch(() => {
            alert("Konto kustutamine ebaõnnestus. Proovi uuesti!");
          });
    },

    logout() {

      alert("Logi välja toimub...");

      setTimeout(() => {
        this.$router.push("/");
      }, 4000);
    }
  }
};
</script>

<style scoped>

.profile-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
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

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.ad-banner {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.ad-banner:hover {
  transform: scale(1.05);
}

.ad-link {
  display: block;
}


.logo {
  width: 100px;
  height: auto;
}
</style>
