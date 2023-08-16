<script setup>
import { sidebarWidthNum } from '../sidebar/state';
import Sidebar from '@/components/sidebar/Sidebar.vue';

//count number of issues in the database


//counting elements in issues array

const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const issues = ref([]); // Define 'issues' outside of conditionals

  // if (whosAuthenticated.value === 'ADMIN' || whosAuthenticated.value === 'RESPONSIBLE') {
  //     const fetchIssues = async () => {
  //         const response = await fetch('http://localhost:8000/api/tickets/');
  //         issues.value = await response.json();
  //     };
  //     onMounted(fetchIssues);
  // } else if (whosAuthenticated.value === 'USER') {
  //     const fetchIssues = async () => {
  //         const response = await fetch('http://localhost:8000/api/tickets/'+JSON.parse(localStorage.getItem('user')).id);
  //         issues.value = await response.json();
  //     };
  //     onMounted(fetchIssues);
  // } else {
  //     console.log("Not Authenticated");
  // }



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
        <th scope="col">NavTo</th>                          
    <th scope="col">#</th>
    <th scope="col">Full Name</th>
    <th scope="col">Email</th>
    <th scope="col">User Role</th>
    <th scope="col">ChRole</th>
    <th scope="col">Issues</th>
    
    </tr>


</thead>
<tbody>
    <tr v-for="user in users">
        <td scope="row">
              <a style="width: 30px; height: 30px;" class="btn btn-success rounded-circle" href="#"> 
                 <div style="font-size: 18px; display: flex; justify-content: center;">
                <i class="fa-brands fa-searchengin"></i>
                </div>
             </a>
        </td>
        <th scope="row">{{user.id}}</th>
        <td>{{ user.fullName }}</td>
        <td>{{ user.email  }}</td>
        <td>{{user.role}}</td>
        <td>
          <a href="#" class="btn btn-sm bg-success" > <i class="fa-solid fa-clock-rotate-left"> </i></a>
           </td>
        <td>50</td> 
        </tr>

</tbody>
</table>

</div>

</div>

</template>

<style scoped>
</style>
