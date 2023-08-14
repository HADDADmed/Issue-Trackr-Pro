<script setup>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';
import  UserNavBar from '../NavBars/UserNavbar.vue'
import { sidebarWidthNum } from '../sidebar/state';

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}

// fetching users from the database
import axios from 'axios';
import { ref } from 'vue';
const users = ref([]);
axios.get('http://localhost:8000/api/users/role/USER')
  .then(response => {
    users.value = response.data;
  })
  .catch(error => console.log(error));

// fetching responsibles from the database

const responsibles = ref([]);
axios.get('http://localhost:8000/api/users/role/RESPONSIBLE')
  .then(response => {
    responsibles.value = response.data;
  })
  .catch(error => console.log(error));

  const props = defineProps(['whosAuthenticated'])

const whatShouldIDisplay = ref('USERS') // USERS or RESPONSIBLES

// button to chose what to display
function displayUsers() {
  whatShouldIDisplay.value = 'USERS'
}

</script>

<template>


  <div id="app">
    <Sidebar></Sidebar>
    
     
<!-- list of Normal users  -->
<div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >

                        <h1 style="font-size: 35px; " >List  Of All Users</h1>
                            <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Role</th>
                            <th scope="col">Issues</th>
                            <th scope="col">ChRole</th>
                            <th scope="col">delUser</th>
                            
                            </tr>
                        
                        
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <th scope="row">{{user.id}}</th>
                                <td>{{ user.fullName }}</td>
                                <td>{{ user.email  }}</td>
                                <td>{{user.role}}</td>
                                <td>50</td>
                                <td>
                                    <a href="#" class="btn btn-sm bg-success" > <i class="fa-solid fa-clock-rotate-left"> </i></a>
                                    </td>
                                    <td>
                                    <a href="#" class="btn btn-sm bg-danger" > <i class="fa-regular fa-trash-can"></i></a>
                                    </td>
                                
                                </tr>
                        
                        </tbody>
                        </table>
    
    </div>

    
    </div>
      
 
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
