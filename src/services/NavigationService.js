import router from "@/router";

export default {
    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },

    navigateToLototronView() {
        router.push({name: 'lototronRoute'})
    },

    navigateToRegisterView() {
        router.push({name: 'registerRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToCreateLunchView() {
        router.push({name: 'createLunchRoute'})
    },

    navigateToJoinLunchView() {
        router.push({name: 'joinLunchRoute'})
    },
    navigateToRestaurantView() {
        router.push({name: 'restaurantRoute'})
    },
    navigateToRestaurantMapView() {
        router.push({name: 'restaurantMapRoute'})
    },

    navigateToMessagesView() {
        router.push({name: 'messagesRoute'})
    },

}