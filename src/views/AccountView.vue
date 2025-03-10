<template>
  <div class="container text-center">
    <!-- Peamenüü riba -->
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <router-link to="/lototron" class="nav-link">Lototron</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/loo-louna" class="nav-link">Loo Lõuna</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/liitu-lounaga" class="nav-link">Liitu Lõunaga</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/konto" class="nav-link">Konto</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/soogikohad" class="nav-link">Söögikohad</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/kuisimuude-generatoor" class="nav-link">Küsimuste Generaator</router-link>
              </li>
              <!-- Logi välja nupp -->
              <li class="nav-item">
                <button @click="logout" class="btn btn-danger action-button red">Logi välja</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <!-- Profiilipilt ja pildihaldusnupud -->
    <div class="row my-4">
      <div class="col-md-6">
        <ProfileImage /> <!-- Profiilipildi komponent -->

        <button @click="isEditProfileModal = true" class="action-button yellow me-3">Muuda andmeid</button>
        <button @click="isChangePasswordModal = true" class="action-button yellow me-3">Vaheta parool</button>
        <button @click="isDeleteAccountModal = true" class="action-button delete-button">Kustuta konto</button>
      </div>
      <div class="col-md-1">


      </div>
      <!-- Bännerite osa -->
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

    <!-- Kolmas rida: Nupud -->
    <div class="row buttons-row">
      <div class="col">




      </div>
      <div class="col">
      </div>
      <div class="col">
      </div>
    </div>

    <!-- Modal aknad -->
    <EditProfileModal v-if="isEditProfileModal" @close="isEditProfileModal = false"/>
    <ChangePasswordModal v-if="isChangePasswordModal" @close="isChangePasswordModal = false"/>
    <DeleteAccountModal v-if="isDeleteAccountModal" @close="isDeleteAccountModal = false" @confirm="handleDeleteAccount" />
  </div>
</template>

<script>
import ProfileImage from "@/components/account/ProfileImage.vue"; // Impordi profiilipilt

export default {
  name: "AccountView",
  components: {
    ProfileImage: ProfileImage,  // Profiilipilt
  },
  data() {
    return {
      // Muud andmed
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
      // Konto kustutamise loogika
    },
  },
};
</script>

<style scoped>
/* Logo paigutus ja suurus */
.logo {
  width: 150px;  /* Või kasuta sobivamaid mõõtmeid */
  height: auto;  /* Kõrgus määratakse automaatselt */
  object-fit: contain; /* Et pilt ei läheks moonutatud */
}

/* Üldine nuppude stiil */
.action-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Hover efekti üleminek */
}

/* Kollased nupud: Muuda pilti, Lisa pilti, Kustuta pilti, Muuda andmeid, Vaheta parool */
.action-button.yellow {
  background-color: #f8da71; /* Kollane taust */
  color: #131317; /* Must tekst */
}

.action-button.yellow:hover {
  background-color: #e2c04f; /* Tumekollane hover efekt */
}

/* Punased nupud: Logi välja ja Kustuta konto */
.action-button.red {
  background-color: #dc3545; /* Punane taust */
  color: white; /* Valge tekst */
}

.action-button.red:hover {
  background-color: #c82333; /* Tumepunane hover efekt */
}

/* Kustuta konto nupp (eriti punane) */
.delete-button {
  background-color: #dc3545; /* Punane taust */
  color: white; /* Tekstivärv */
}

.delete-button:hover {
  background-color: #c82333; /* Tumepunane hover efekt */
}

/* Paigutus nuppude rida üksteise kõrvale */
.buttons-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Väike kaugus nuppude vahel */
  margin-top: 20px;
}

.row > .col {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Bännerite stiil */
.ad-banner {
  width: 100%;
  max-width: 150px; /* Väiksem maksimaalne laius */
  height: auto; /* Kõrgus skaleerub automaatselt */
  border-radius: 10px; /* Ümarad nurgad bänneril */
  transition: transform 0.3s ease; /* Animatsioon */
}

.ad-banner:hover {
  transform: scale(1.05); /* Suurendab bännerit, kui sellele osutatakse */
}

.ad-link {
  display: block;
  margin-bottom: 15px; /* Lisa bännerite vaheline kaugus */
}

/* Profiilipilt ja muud stiilid */
.profile-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Ümmargune avatar */
  object-fit: cover;  /* Tagab, et pilt täidaks ümmarguse kuju ilma deformeerumiseta */
}
</style>
