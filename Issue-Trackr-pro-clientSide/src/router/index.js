import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePageVue.vue'
import LoginPage from '../views/LoginPageVue.vue'
import UserHomePage from '../views/UserHomePageVue.vue'
import AdminHomePage from '../views/AdminHomePageVue.vue'
import ResponsibleHomePage from '../views/ResponsibleHomePageVue.vue'
import NotAuthenticatedHomePage from '../views/NotAuthenticatedHomePageVue.vue'
import AdminHomeresp from '../views/AdminHomeresp.vue'
import TickestsList from '../views/TicketsListVue.vue'
import TicketsAdd from '../views/TicketsAddVue.vue'
import TicketDetaills from '../views/TicketDetaillsVue.vue'
import CategoryAdd from '../views/CategoryAddVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotAuthenticatedHomePage
    },
    {
      path: '/home',
      name: 'homePage',   
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/homeuser',
      name: 'homeuser',
      component: UserHomePage
    },
    
    {
      path: '/homeresponsible',
      name: 'homeresponsible',
      component: ResponsibleHomePage
    },
    {
      path: '/homeadminresponsibles',
      name: 'AdminHomePageResponsibles',
      component: AdminHomeresp
    },{
      path: '/ticketlist',
      name: 'ticketlist',
      component: TickestsList
    },{
      path: '/ticketlist/:userId',
      name: 'ticketlistuderid',
      component: TickestsList
    },{
      path: '/ticketsadd/:id',
      name: 'ticketsadd',
      component: TicketsAdd
    },{
      path: '/ticketdetaills/:id',
      name: 'TicketDetaills',
      component: TicketDetaills
    },{
      path: '/categoryadd',
      name: 'categoryadd',
      component: CategoryAdd
    }
  ]
})

export default router
