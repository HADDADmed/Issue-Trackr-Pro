<script setup>
import { sidebarWidthNum } from '../sidebar/state';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import axios from 'axios';
import { ref, onMounted, defineAsyncComponent } from 'vue';

// Count number of issues in the database

// Counting elements in issues array

const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const issues = ref([]); // Define 'issues' outside of conditionals
const users = ref([]);

// Fetching users from the database
axios.get('http://localhost:8000/api/users/role/USER')
  .then(response => {
    users.value = response.data;
  })
  .catch(error => console.log(error));
// Function to calculate sidebar width
function sidebarWidthNumf() {
  return `${sidebarWidthNum.value + 40}px`;
}

// Count number of tickets of user /count/:userId
async function countTicketsbyUser(userId) {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/count/${userId}`);
    console.log(response.data[0]['COUNT(*)']);
    return response.data[0]['COUNT(*)'];
  } catch (error) {
    console.error(error);
    return 'N/A'; // Provide a default value in case of error
  }
}


const userTicketCounts = ref({});

// Fetch data on component mount
onMounted(async () => {
  console.log('Number of tickets:', await countTicketsbyUser(7));
  
  // Fetch ticket counts for all users
  const ticketCountsPromises = users.value.map(user => countTicketsbyUser(user.id));
  const ticketCounts = await Promise.all(ticketCountsPromises);
  userTicketCounts.value = Object.fromEntries(users.value.map((user, index) => [user.id, ticketCounts[index]]));
});
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
    <th class="d-flex justify-content-center" scope="col">Issues</th>
    
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
       
           <td class="d-flex justify-content-center"  >
            <router-link :to="'/ticketlist/' + user.id" class="ticketscount">
              {{ userTicketCounts[user.id] }}
            </router-link>
          </td>

        </tr>

</tbody>
</table>

</div>

</div>

</template>

<style scoped>

.ticketscount {
  text-decoration: none;
  font-weight: bold;
  margin-top: 0px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  opacity: 0.5; /* Adjust the opacity value */
  transition: opacity 0.2s; /* Add a smooth transition effect */
  background-color: blue; /* Orange with transparency */
  color: white;
}


.ticketscount:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */
  opacity: 1; /* Adjust the opacity value */

}
</style>
