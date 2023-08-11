import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePageVue.vue'
import LoginPage from '../views/LoginPageVue.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router
