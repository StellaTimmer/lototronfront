<template>
  <div>
    <h1>Söögikohad</h1>
    <div class="container text-center enlarged">
      <div class="row">
        <div class="col-md-6">
          <button
              v-for="(restaurant, index) in restaurants"
              :key="index"
              @click="navigateToRestaurantView(restaurant.link)"
              type="button"
              class="btn btn-warning big-button mt-3"
          >
            {{ restaurant.name }}
          </button>
        </div>
        <div class="col-md-6">
          <button
              v-for="(restaurant, index) in restaurants"
              :key="'map-' + index"
              @click="navigateToRestaurantMapView(restaurant.mapLink)"
              type="button"
              class="btn btn-warning big-button mt-3"
          >
            Vaata asukohta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantView",
  data() {
    return {
      restaurants: [
        { name: "Guru Restoran", link: "https://restoranguru.ee/", mapLink: "https://maps.app.goo.gl/GFKzU1bej3kE37LC6" },
        { name: "Beer Garden", link: "https://beergarden.ee/", mapLink: "https://maps.app.goo.gl/Kg8fE1XQoJ5L3aS37" },
        { name: "Tallinn Pizza & Kebab", link: "https://pizzakoju.ee/restoran/tallinn-pizza-kebab/", mapLink: "https://maps.app.goo.gl/bCnvGp6rLZYW6qkt6" },
        { name: "Hesburger Viru", link: "https://www.hesburger.ee/restoranid?tid=233", mapLink: "https://maps.app.goo.gl/nYW6ap5kGL2iEcfg7" },
        { name: "Kanuti Ramen Bar", link: "https://www.facebook.com/kanutiramenbar/", mapLink: "https://maps.app.goo.gl/27cqwY492bEUZQan8" },
        { name: "Restaurant Tai Boh", link: "https://taiboh.com/", mapLink: "https://maps.app.goo.gl/Q5ep6aVg14TeLNme8" }
      ]
    };
  },
  methods: {
    navigateToRestaurantView(link) {
      window.open(link, "_blank"); // Avab õige restorani lehe
    },
    navigateToRestaurantMapView(mapLink) {
      window.open(mapLink, "_blank"); // Avab õige kaardi asukoha
    }
  }
};
</script>

<style scoped>
.big-button {
  font-size: 20px;
  padding: 20px 40px;
  border-radius: 20px;
  width: 100%; /* Et nupud täidaksid veeru */
}

.enlarged {
  width: 100%;
}

.container {
  max-width: 600px;
}
</style>
