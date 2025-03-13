import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import LototronView from "@/views/LototronView.vue";
import CreateLunchView from "@/views/CreateLunchView.vue";
import JoinLunchView from "@/views/JoinLunchView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import AccountView from "@/views/AccountView.vue"
import QuestionsGenerator from "@/views/QuestionsGenerator.vue";

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
    path: '/generator',
    name: 'generatorRoute',
    component: QuestionsGenerator
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
