import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from "@/views/ErrorView.vue";
import LototronView from "@/views/LototronView.vue";
import CreateLunchView from "@/views/CreateLunchView.vue";
import JoinLunchView from "@/views/JoinLunchView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
