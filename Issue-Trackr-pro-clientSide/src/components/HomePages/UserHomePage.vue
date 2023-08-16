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
    <div  :style="{ 'margin-left': sidebarWidthNumf() }" >
      <section class="bg">
              <div id="app">
                <div style="margin: 40px 40px 40px 0px; ">
              <h1>HELLO  <strong style="color: red;">{{ user.fullName}}</strong>  👋</h1>
              <h1>Welcome to your workSpace</h1>

              <div style="margin-top: 50px;" class="d-flex justify-content-around" >
              <button type="button" @click="toTicketAdd()" class="btn btn-primary">Add New Ticket</button>
              <button type="button" @click="toTicketList()" class="btn btn-secondary">Display All Tickets</button>
              </div>
              </div>
                </div>
              </section>
    </div>
</template>

<style scoped>

.bg {

  background-size: cover;
 
  text-align: center;
  padding: 150px;
}

</style>
