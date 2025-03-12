<template>
  <div class="container text-center">

    <!--  KUSTUTADA    -->
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <router-link to="/lototron" class="nav-link">Lototron</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/createlunch" class="nav-link">Loo Lõuna</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/joinlunch" class="nav-link">Liitu Lõunaga</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/account" class="nav-link">Konto</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/restaurants" class="nav-link">Söögikohad</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/generator" class="nav-link">Küsimuste Generaator</router-link>
              </li>
              <li class="nav-item">
                <button @click="logout" class="btn btn-danger action-button red">Logi välja</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="row my-4">
      <div class="col-md-6">
        <ProfileImage/>
        <button @click="isEditProfileModal = true" class="action-button yellow me-3">Muuda andmeid</button>
        <button @click="openChangePasswordModal" class="action-button yellow me-3">Vaheta parool</button>
        <button @click="isDeleteAccountModal = true" class="action-button delete-button">Kustuta konto</button>
      </div>
      <div class="col-md-1"></div>

<!--  KUSTUTADA    -->
      <div class="col-md-3">
        <a href="https://rotermann.ee/tana-lounaks/" target="_blank" class="ad-link">
          <img src="/rotermann.png" height="225" width="225" alt="Reklaam 1" class="ad-banner"/>
        </a>
        <a href="https://xn--pevapakkumised-5hb.ee/tallinn/" target="_blank" class="ad-link">
          <img src="/paevapakkumised.jpg" alt="Reklaam 2" class="ad-banner"/>
        </a>
        <a href="https://www.lhv.ee/et/terviselaen/" target="_blank" class="ad-link">
          <img src="/RTBbanner.jpg" alt="Reklaam 3" class="ad-banner"/>
        </a>
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
        @submit="updateUserData"
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
      userData: {
        firstName: "Rain",
        lastName: "Smith",
        phone: "12345678",
      },
      isEditProfileModal: false,
      isChangePasswordModal: false,
      isDeleteAccountModal: false,
    };
  },
  methods: {
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
    updateUserData(updatedData) {
      this.userData = updatedData;
      console.log("Kinnitatud andmed:", updatedData);
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
  background-color: #f8da71;
  color: #131317;
}

.action-button.yellow:hover {
  background-color: #e2c04f;
}


.action-button.red {
  background-color: #dc3545;
  color: white;
}

.action-button.red:hover {
  background-color: #c82333;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}


.ad-banner {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.ad-banner:hover {
  transform: scale(1.05);
}

.ad-link {
  display: block;
  margin-bottom: 15px;
}


</style>
