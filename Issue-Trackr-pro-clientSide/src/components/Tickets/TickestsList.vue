<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';


function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
function  formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const issues = ref([]); // Define 'issues' outside of conditionals

if (whosAuthenticated.value === 'ADMIN' || whosAuthenticated.value === 'RESPONSIBLE') {
    const fetchIssues = async () => {
        const response = await fetch('http://localhost:8000/api/tickets/');
        issues.value = await response.json();
    };
    onMounted(fetchIssues);
} else if (whosAuthenticated.value === 'USER') {
    const fetchIssues = async () => {
        const response = await fetch('http://localhost:8000/api/tickets/'+JSON.parse(localStorage.getItem('user')).id);
        issues.value = await response.json();
    };
    onMounted(fetchIssues);
} else {
    console.log("Not Authenticated");
}


console.log("whosAuthenticated from tickett page 1: " + whosAuthenticated);
console.log("localStorage.getItem('token'): " + localStorage.getItem('token'));
console.log("localStorage.getItem('user'): " + localStorage.getItem('user'));
// console.log("localStorage.getItem('user').role: " + JSON.parse(localStorage.getItem('user')).role);

const props = defineProps({
     addORedit: {
         type: String,
     }
});
</script>

<template>

<div id="app">
    <Sidebar></Sidebar>
   <MainNavBar :whosAuthenticated=ADMIN></MainNavBar> 

    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >

        <!-- ADD NEW ISSUE  -->
        <h1 style="margin-bottom: 10px;" >List Of All Isuues of </h1>
<!-- 
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">user Name</th>
      <th scope="col">Title</th>
      <th colspan="3" scope="col">Content</th>
      <th scope="col">Status</th>
      <th scope="col">created AT</th>
      
    </tr>
  </thead>
  <tbody>
  
    <tr>
      <th scope="row">Harry potter</th>
      <td>@twitter</td>
      <td colspan="3">Larry the Bird</td>
      <td>pending</td>
      <td>18/20/2015</td>
    </tr>
  </tbody>
</table> -->


                <table class="table">
                <thead class="thead-light">
                                               
                                    <tr>
                                    <th scope="col">#ticket_id</th>
                                    <th scope="col">#user_Id</th>
                                    <th scope="col">#Category_Id</th>
                                    <th scope="col">Title</th>
                                    <th colspan="3" scope="col">Content</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">createdAt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    <tr v-for="issue in issues" >
                                    <th scope="row">{{ issue.id }}</th>
                                    <th scope="row">{{ issue.user_id }}</th>
                                    <td>{{issue.category_id}}</td>
                                    <td>{{issue.title}}</td>
                                    <td colspan="3">{{issue.description}}</td>
                                    <td>{{ issue.status }}</td>
                                    <td>{{formatDate(issue.createdAt ) }}</td>
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
