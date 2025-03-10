<template>
  <div class="profile-image-container">
    <!-- Profiilipilt -->
    <img
        :src="profileImage || '/defaultpicture.jpg'"
        alt="Profiilipilt"
        class="profile-image"
        :class="{'fade-in': isImageLoaded}"
        @load="onImageLoad"
    />

    <!-- Nupud profiilipildi muutmiseks, lisamiseks ja kustutamiseks -->
    <div class="buttons-container">
      <button @click="changeProfilePicture" class="action-button">Muuda pilti</button>
      <button @click="uploadPicture" class="action-button">Lisa pilt</button>
      <button @click="deletePicture" class="action-button">Kustuta pilt</button>
    </div>

    <!-- Failide üleslaadimise sisend -->
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
  </div>
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      // Profiilipilt määratud alguses tühi väärtus (või saab muuta kasutaja poolt)
      profileImage: '',  // Kui profiilipilt puudub, kuvatakse vaikimisi avatar
      isImageLoaded: false, // Flag, et animatsioon tööle panna
    };
  },
  methods: {
    // Muuda profiilipilt (kutsub esile faili valimise dialoogi)
    changeProfilePicture() {
      this.$refs.fileInput.click(); // Avab faili valimise dialoogi
    },

    // Laadi profiilipilt üles (kutsume sama dialoogi)
    uploadPicture() {
      this.$refs.fileInput.click(); // Avab faili valimise dialoogi
    },

    // Kustuta profiilipilt ja naase tagasi vaikimisi avatarile
    deletePicture() {
      this.profileImage = ''; // Läheb tagasi vaikimisi avatarile
      this.isImageLoaded = false; // Lülitab animatsiooni välja, kui pilt eemaldatakse
    },

    // Faili valimise käsitlemine
    handleFileChange(event) {
      const file = event.target.files[0]; // Valitud fail
      if (file) {
        const reader = new FileReader(); // Faili lugemise objekti loomine
        reader.onload = (e) => {
          this.profileImage = e.target.result; // Seab profiilipildi faili sisuga
          this.isImageLoaded = false; // Alustame animatsiooni (peidame pildi enne laadimist)
        };
        reader.readAsDataURL(file); // Loeb faili andmed base64 formaadis
      }
    },

    // Pilt on laaditud, käivitage animatsioon
    onImageLoad() {
      this.isImageLoaded = true;
    },
  },
};
</script>

<style scoped>
/* Profiilipildi konteiner */
.profile-image-container {
  display: flex;
  justify-content: center;
  flex-direction: column; /* Paigutame nupud allapoole */
  align-items: center;
  margin-bottom: 20px;
}

/* Profiilipildi stiil: Kuvame nagu bänner */
.profile-image {
  width: 100%;  /* Bännerite suurus */
  max-width: 300px; /* Piirame profiilipildi suurust */
  height: auto;  /* Kõrgus määratakse automaatselt */
  border-radius: 10px; /* Ümarad nurgad bänneril */
  object-fit: cover;  /* Täidab pildi ruumi */
  opacity: 0; /* Alguses pilt on nähtamatu */
  transition: opacity 1s ease-in-out; /* Animatsioon pildi ilmumiseks */
}

/* Kui pilt on laetud, muudame selle nähtavaks */
.profile-image.fade-in {
  opacity: 1; /* Kui pilt on laetud, siis pilt kuvatakse */
}

/* Nupud (Muuda pilti, Lisa pilti, Kustuta pilti) */
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
