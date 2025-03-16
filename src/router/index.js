import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import LototronView from "@/views/LototronView.vue";
import CreateLunchView from "@/views/CreateLunchView.vue";
import JoinLunchView from "@/views/JoinLunchView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import AccountView from "@/views/AccountView.vue"
import QuestionsGenerator from "@/views/QuestionsGenerator.vue";
import Restaurant from "@/views/RestaurantView.vue";
import MessagesView from "@/views/MessagesView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/lototron',
    name: 'lototronRoute',
    component: LototronView
  },
  {
    path: '/createlunch',
    name: 'createLunchRoute',
    component: CreateLunchView
  },
  {
    path: '/joinlunch',
    name: 'joinLunchRoute',
    component: JoinLunchView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView // burgsi vaade
  },

  {
    path: '/register',
    name: 'registerRoute',
    component: RegistrationView
  },

  {
    path: '/account',
    name: 'accountRoute',
    component: AccountView
  },

  {
    path: '/restaurants',
    name: 'accountRestaurantRoute',
    component: Restaurant
  },

  {
    path: '/generator',
    name: 'generatorRoute',
    component: QuestionsGenerator
  },
  {
    path: '/messages',
    name: 'messagesRoute',
    component: MessagesView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
