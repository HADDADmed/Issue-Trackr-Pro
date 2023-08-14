<script setup>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';
import { sidebarWidthNum } from '@/components/sidebar/state';
import MainNavBar from '@/components/MainNavBar.vue';
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

const props = defineProps(['whatShouldIDisplay'])
const ADMIN =   'ADMIN';

</script>
<template> 

<div id="app">
    <Sidebar></Sidebar>
   <MainNavBar :whosAuthenticated=ADMIN></MainNavBar> 

    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <div v-if="whatShouldIDisplay == 'USERS'"></div>
             <h1 style="font-size: 40px;    " >List of All Responsibles </h1>
                            <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">UsersCount</th>
                            <th scope="col">ChRole</th>
                            <th scope="col">DelResp</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr v-for="responsible in responsibles">
                                <th scope="row">{{responsible.id}}</th>
                                <td>{{ responsible.fullName }}</td>
                                <td>{{ responsible.email  }}</td>
                                <td>{{responsible.role}}</td>
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

