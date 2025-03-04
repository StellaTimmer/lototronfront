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

    navigateToCreateLunchView() {
        router.push({name: 'createLunchRoute'})
    },
    navigateToJoinLunchView() {
        router.push({name: 'joinLunchRoute'})
    },

}