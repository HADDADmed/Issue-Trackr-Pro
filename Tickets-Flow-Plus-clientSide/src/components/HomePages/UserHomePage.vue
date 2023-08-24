<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import  UserNavBar from '../NavBars/UserNavbar.vue'
import { ref } from 'vue' 
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { sidebarWidthNum } from '../sidebar/state';

import { useRouter } from 'vue-router';

const router = useRouter();
function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const user = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')) : 'NOT_AUTHENTICATED');

function   toTicketAdd(){
  router.push('/ticketsadd/0')
}
function  toTicketList(){
  router.push('/ticketlist')
}
</script>

<template>
    <Sidebar></Sidebar>
    
    <!-- list of Normal users  -->
    <section class="bg">
    <div  :style="{ 'margin-left': sidebarWidthNumf() }" >
              <div id="app">
                <div style="margin: 40px 40px 40px 0px; ">
              <h1>HELLO  <strong style="color: #1f4e7a;">{{ user.fullName}}</strong>  </h1>
              <h1>Welcome to your Ticket Flow Plus workSpace</h1>

              <div style="margin-top: 50px;" class="d-flex justify-content-around" >
              <button type="button" @click="toTicketAdd()" class="btn btn-primary btn-lg rounded-pill hoverC">Add New Ticket</button>
              <button type="button" @click="toTicketList()" class="btn btn-secondary btn-lg rounded-pill hoverC">Display All Tickets</button>
              </div>
              </div>
                </div>
              </div>
            </section>
</template>

<style scoped>

.bg {

  /* set an immege to the background */
  background-image: url("./91511.jpg");
  background-size: cover;
  background-position: center;
  /* cover the hole page */
  height: 100vh;
  width: 100%;


 
  text-align: center;
  padding: 150px;
}
.hoverC:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */

} 
</style>
