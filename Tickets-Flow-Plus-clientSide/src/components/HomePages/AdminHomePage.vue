<script setup>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';
import  UserNavBar from '../NavBars/UserNavbar.vue'
import { sidebarWidthNum } from '../sidebar/state';

import { useRouter } from 'vue-router';
const router = useRouter();

// using the toasts
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}

// fetching users from the database
import axios from 'axios';
import { ref,onMounted } from 'vue';
let newRole = '';

// changeRole function
function changeRole(userId, oldRole) {
  console.log("changeRole");
  console.log("userId: " + userId);
    if (oldRole == 'USER' || oldRole == 'user') {
      newRole = 'RESPONSIBLE';
    } else if (oldRole == 'RESPONSIBLE' || oldRole == 'responsible') {
      newRole = 'USER';
    }
  console.log("newRole: " + newRole);
  axios.put('http://localhost:8000/api/users/change-user-role',{
    id: userId,
    role: newRole
  })
  .then(function (response) {
    console.log(response);
    console.log("Role changed succefuly");
  })
  .catch(function (error) {
    console.log(error);
  });
  toaster.show(`<div><i class="fa-solid fa-circle-check"></i> User Role Changed to Responsible Successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });

router.push('/homeadminresponsibles');

}


const users = ref([]);
async function fetchUsers() {
  axios.get('http://localhost:8000/api/users/role/USER')
  .then(response => {
    users.value = response.data;
    setTitle()

  })
  .catch(error => console.log(error));
}

// fetching responsibles from the database

const responsibles = ref([]);
async function fetchResponsibles() {
  axios.get('http://localhost:8000/api/users/role/RESPONSIBLE')
  .then(response => {
    responsibles.value = response.data;
    setTitle();

  })
  .catch(error => console.log(error));
}

onMounted(async () => {
  fetchUsers();
  fetchResponsibles();
  setTitle();

});


function deleteUser(userId) {
  
  axios.delete(`http://localhost:8000/api/users/${userId}`)
    .then(response => {
      fetchUsers();
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> User Deleted Successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "error",
                      });
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      toaster.error("Error deleting user");
    });
}
  const props = defineProps(['whosAuthenticated'])

const whatShouldIDisplay = ref('USERS') // USERS or RESPONSIBLES

// button to chose what to display
function displayUsers() {
  whatShouldIDisplay.value = 'USERS'
}


//function to chage user Role to responsible


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
var subtitle = ref('');
var title = ref('');
async function setTitle() {
  subtitle = 'count of Users : ' + users.value.length;
  console.log("subtitel "+subtitle);
  title = 'List of all Users';
}
// onMounted(
//   setTitle()
// )
onMounted(async () => {
  console.log('Number of tickets:', await countTicketsbyUser(7));
  
  // Fetch ticket counts for all users
  const ticketCountsPromises = users.value.map(user => countTicketsbyUser(user.id));
  const ticketCounts = await Promise.all(ticketCountsPromises);
  userTicketCounts.value = Object.fromEntries(users.value.map((user, index) => [user.id, ticketCounts[index]]));

  console.log("subtitel "+subtitle);

});
import Title from '@/components/Partials/Title.vue';
</script>

<template>


  <div id="app">
    <Sidebar></Sidebar>
    
     
<!-- list of Normal users  -->
<div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >

                         <Title :title="title" :subtitle="subtitle" ></Title>

                            <table class="table" style="border: 10px;" >
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Role</th>
                            <th scope="col">Tickets</th>
                            <th scope="col">ChRole</th>
                            <th scope="col">delUser</th>
                            
                            </tr>
                        
                        
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <th scope="row">{{user.id}}</th>
                                <td>{{ user.fullName }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{user.role}}</td>
                                <td class="d-flex justify-content-center ">
                                  <router-link :to="'/ticketlist/' + user.id" class="ticketscount">
                                    {{ userTicketCounts[user.id] }}
                                  </router-link>
                                </td>                               
                                 <td>
                                    <a @click="changeRole(user.id,user.role)" class="btn btn-sm bg-success hoverC" > <i class="fa-solid fa-clock-rotate-left"> </i></a>
                                    </td>
                                    <td>
                                    <a @click="deleteUser(user.id)" class="btn btn-sm bg-danger hoverC" > <i class="fa-regular fa-trash-can"></i></a>
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
.hoverC:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */

}
</style>
