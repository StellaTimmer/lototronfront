<template>

  <div>
    <select :value="selectedRestaurantId" @change="handleSelectedRestaurantChange" class="form-select" aria-label="Default select example">
      <option value=0>Vali söögikoht</option>
      <option v-for="restaurant in availableRestaurants" :value="restaurant.restaurantId">{{restaurant.restaurantName}}</option>

    </select>


  </div>


</template>

<script>
export default {
  name: "RestaurantsDropdown",
  props: {
    availableRestaurants: {},
    selectedRestaurantId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSelectedRestaurantChange(event) {
      this.$emit('event-new-restaurant-selected', Number(event.target.value))
    }
  }
}
</script>



