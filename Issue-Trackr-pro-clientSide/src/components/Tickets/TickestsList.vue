<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import axios from 'axios';
import { useRouter  ,useRoute } from 'vue-router';

const router = useRouter();

const route = useRoute();
//making userId from the url changing dynamically

const user = ref(JSON.parse(localStorage.getItem('user')));
const userId = route.params.userId?route.params.userId:((user.value.role =='ADMIN'||user.value.role =='RESPONSIBLE')?null:user.value.id);
console.log("userId: " + userId);

const title = ref('');

console.log("user_id  :" + userId);


// creat an array to store the ids of the tickets that we want to delete
const ticketsToDelete = ref([]);


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
let subtitle = ref('');
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const issues = ref([]); // Define 'issues' outside of conditionals
let cmp = 0;
async function fetchIssues() {
  try {
    let response;
    if (userId) {
      response = await fetch('http://localhost:8000/api/tickets/' + userId);
      title.value = 'List of all Tickets' ;
      subtitle.value = 'of user with id : #' + userId + ' and name : ' + getUserNameById(userId);

    } else {
      response = await fetch('http://localhost:8000/api/tickets');
      title.value = 'List of all Tickets';
      subtitle.value = 'of all users';
    }
    const responseData = await response.json(); // Read the response body once
    issues.value = responseData; // Use the stored response data
  } catch (error) {
    console.error(error);
  }
}
const users = ref([]);
async function fetchUsers() {
  try {
    const usersResponse = await axios.get(`http://localhost:8000/api/users`);
    users.value = usersResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
const whosAuthenticated = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED';
  const userId = (user && user.id) || null;
  fetchUsers()
  console.log(users)
  if (whosAuthenticated === 'ADMIN' || whosAuthenticated === 'RESPONSIBLE') {
    if (userId) {
      fetchIssues();
    } else if (whosAuthenticated !== 'USER' && userId) {
      fetchIssues();
    }
  } else if (whosAuthenticated === 'USER') {
    fetchIssues();
  } else {
    console.log("Not Authenticated");
  }
});

function getUserNameById(user_id) {
  console.log("user_id : " + user_id);
  console.log("users.value : ");
  console.log(users.value);

  const user = users.value.find(item => item.id == user_id);

  console.log("user : ");
  console.log(user);

  return user ? user.fullName : 'Unknown';
}

console.log("whosAuthenticated from tickett page 1: " + whosAuthenticated);
console.log("localStorage.getItem('token'): " + localStorage.getItem('token'));
console.log("localStorage.getItem('user'): " + localStorage.getItem('user'));
// console.log("localStorage.getItem('user').role: " + JSON.parse(localStorage.getItem('user')).role);

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

//delete Ticket from Database 

function deleteTicket(ticketId,status = false)
{
const response = axios.delete('http://localhost:8000/api/tickets/'+ticketId).then((response) => {
  fetchIssues();
})  
console.log('Deleted succefuly')

   if(!status)
   {
     toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Ticket Deleted succefuly !</div>`, {
                         position: "top",
                         duration: 5000,
                         type: "error",
 
                       });
                        //  location.reload();
   }
}

const props = defineProps({
     addORedit: {
         type: String,
     }
});



const ticketDb = ref({
});

//fetching ticket from the databess

let statusT = '';
const ticket = ref({
    id: '',
    title: '',
    content: '',
    category_id: '',
    status: statusT,
    user_id: '',
    
});

const ticket_id = ref(0);
var statusIndex = ref(0);
var actualStatus = ref('');

import { Modal } from 'usemodal-vue3';

let isVisible = ref(false);

// function to ppen the pop up model 
function openModal(id) {
      ticket_id = id;
     isVisible.value = true;
     onMounted(async () => {
  try {
    const ticketResponse = await axios.get(`http://localhost:8000/api/tickets/ticket/${ticket_id}`);
    ticketDb.value = ticketResponse.data[0];
    actualStatus.value = ticketDb.value.status;
    console.log("ticketDb.value :  " );
    console.log(ticketDb.value);    
    // Rest of your code...
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
   
}

function getShortDescription(description) {
  const maxChars = 50; // Define the maximum characters for the short description
  if (description.length > maxChars) {
    return description.substring(0, maxChars) + '...';
  }
  return description;
}

// Toggle the full description visibility
function getStatusClass(status) {
  if (status === 'OPEN' || status === 'open'  || status === 'Open') {
    return 'status-open';
  } else if (status === 'PENDING' || status === 'pending' || status === 'Pending') {
    return 'status-pending';
  } else if (status === 'CLOSED'  || status === 'closed'  || status === 'Closed') {
    return 'status-closed';
  } else {
    return 'status-default'; // Provide a default class if status doesn't match
  }
}
var deleteButtoonBool = ref(false);


import LoadingSpiner from '../Partials/LoadingSpiner.vue';
// creating a boolean to show the loading spinner
const loadingSpinner = ref(true);
// returning Loadingspinner to fals after 3 seconds
setTimeout(() => {
  loadingSpinner.value = false;
}, 2400);

var selectedIssueIds = ref([]);
console.log("selectedIssueIds: " + selectedIssueIds.value);

function handleCheckboxChange() {
console.log("selectedIssueIds: " + selectedIssueIds.value);
if (selectedIssueIds.value.length > 0) {
  deleteButtoonBool.value = true;
} else {
  deleteButtoonBool.value = false;
}

}
function deleteMoreThanOneTicket() {
  //deleting from database 
  console.log("selectedIssueIds: " + selectedIssueIds.value);
  const status = true;
  selectedIssueIds.value.forEach(element => {
    deleteTicket(element,status);
  });
  toaster.show(`<div><i class="fa-solid fa-circle-check"></i> All Tickets checked are deleted successfully !</div>`, {
                         position: "top",
                         duration: 5000,
                         type: "error",
 
                       });
                    

}
import Title from '../Partials/Title.vue';

</script>

<template>

<div id="app">
    <Sidebar></Sidebar>
   <MainNavBar></MainNavBar> 

    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >

                      <div v-if="loadingSpinner" style="position: relative; top:200px;"  class="d-flex justify-content-center ">
                        <div style="position: relative; top: -10px;">
                          <LoadingSpiner  :isLoadingSpinerActive="loadingSpinner" > </LoadingSpiner>
                       </div>
                      </div>
        <!-- ADD NEW ISSUE  -->
        <div v-else>

        <div class="d-flex justify-content-center">
          <div  style="margin-left: 20px;">
           <Title :title="title" :subtitle="subtitle" ></Title>
          </div>
        </div>
        <div v-if="deleteButtoonBool" style="margin-bottom:15px;" class="d-flex justify-content-center">
          <button  @click="deleteMoreThanOneTicket()" style="width: 50px" class="btn btn-danger btn-lg rounded-pill">
          <i class="fa-solid fa-trash-can "></i>    
        </button>
         <div style="
           margin-top: 10px;
           margin-left: 15px;

          font-weight: 700;
          font-size: 15px;
          letter-spacing: 2px;
          line-height: 1.5em;
          padding-bottom: 15px;
          position: relative;
         ">
         delete all the selected ticket 
        </div>
        </div>
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
                                               
                                    <tr style="border: 10px;"  >
                                    <th scope="col">                                      
                                         select
                                    </th>
                                    <th scope="col">NavTo</th>
                                    <th scope="col">#ticket_id</th>
                                    <th scope="col">#user_Id</th>
                                    <th scope="col">#Category_Id</th>
                                    <th scope="col">Title</th>
                                    <th colspan="3" scope="col">Content</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">createdAt</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    <tr v-for="issue in issues" style="border: 10px;">
                                       <td >
                                          <div style="margin: 4px;" class="form-check d-flex justify-content-center ">
                                              <input
                                               style="width: 20px;
                                                height: 20px;
                                               "
                                                class="form-check-input border shadow rounded"
                                                type="checkbox"
                                                :value="issue.id"
                                                v-model="selectedIssueIds"
                                                @change="handleCheckboxChange"
                                              >                                          
                                        </div>
                                       </td>
                                       <td scope="row">
                                           <router-link :to="{ name: 'TicketDetaills', params: { id: issue.id } }" class="btn btn-success hoverC">
                                            <i class="fa-solid fa-arrow-right"></i>
                                          </router-link>

                                        </td>
                                        <th scope="row">{{ issue.id }}</th>
                                        <th scope="row">{{ issue.user_id }}</th>
                                        <td>{{issue.category_id}}</td>
                                        <td>{{issue.title}}</td>
                                        <td colspan="3">
                                          <div class="issue-description">
                                            <div class="short-description">{{ getShortDescription(issue.description) }}</div>
                                          </div>
                                        </td>                                       
                                       <td><span  class="status d-flex justify-content-center" :class="getStatusClass(issue.status)" >{{ issue.status }}</span></td>
                                        <td>{{formatDate(issue.createdAt ) }}</td>
                                        <td scope="row">
                                            <div   class="d-flex justify-content-between">
                                              <div v-if="whosAuthenticated == 'ADMIN'||whosAuthenticated == 'RESPONSIBLE'">
                                                <router-link :to="{ name: 'TicketDetaills', params: { id: issue.id } }" class="btn btn-secondary rounded-circle" >
                                          <i class="fa-regular fa-pen-to-square"></i>
                                          </router-link>
                                      
                                              </div>
                                            <a style="width: 30px; height: 30px;" @click="deleteTicket(issue.id)" class="btn btn-danger rounded-circle hoverC" href="#"> 
                                                <div style="font-size: 18px; display: flex; justify-content: center;">
                                                  <i class="fa-solid fa-trash-can"></i>
                                                </div>
                                            </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                </table>



            
        </div>
</div>
</div>
</template>

<style scoped>

.smiley {
	width: 8em;
	height: 8em;
}
.smiley__eye1,
.smiley__eye2,
.smiley__mouth1,
.smiley__mouth2 {
	animation: eye1 3s ease-in-out infinite;
}
.smiley__eye1,
.smiley__eye2 {
	transform-origin: 64px 64px;
}
.smiley__eye2 {
	animation-name: eye2;
}
.smiley__mouth1 {
	animation-name: mouth1;
}
.smiley__mouth2 {
	animation-name: mouth2;
	visibility: hidden;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
	:root {
		--bg: hsl(var(--hue),90%,10%);
		--fg: hsl(var(--hue),90%,90%);
	}
}

/* Animations */
@keyframes eye1 {
	from {
		transform: rotate(-260deg) translate(0,-56px);
	}
	50%,
	60% {
		animation-timing-function: cubic-bezier(0.17,0,0.58,1);
		transform: rotate(-40deg) translate(0,-56px) scale(1);
	}
	to {
		transform: rotate(225deg) translate(0,-56px) scale(0.35);
	}
}
@keyframes eye2 {
	from {
		transform: rotate(-260deg) translate(0,-56px);
	}
	50% {
		transform: rotate(40deg) translate(0,-56px) rotate(-40deg) scale(1);
	}
	52.5% {
		transform: rotate(40deg) translate(0,-56px) rotate(-40deg) scale(1,0);
	}
	55%,
	70% {
		animation-timing-function: cubic-bezier(0,0,0.28,1);
		transform: rotate(40deg) translate(0,-56px) rotate(-40deg) scale(1);
	}
	to {
		transform: rotate(150deg) translate(0,-56px) scale(0.4);
	}
}
@keyframes eyeBlink {
	from,
	25%,
	75%,
	to {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(0);
	}
}
@keyframes mouth1 {
	from {
		animation-timing-function: ease-in;
		stroke-dasharray: 0 351.86;
		stroke-dashoffset: 0;
	}
	25% {
		animation-timing-function: ease-out;
		stroke-dasharray: 175.93 351.86;
		stroke-dashoffset: 0;
	}
	50% {
		animation-timing-function: steps(1,start);
		stroke-dasharray: 175.93 351.86;
		stroke-dashoffset: -175.93;
		visibility: visible;
	}
	75%,
	to {
		visibility: hidden;
	}
}
@keyframes mouth2 {
	from {
		animation-timing-function: steps(1,end);
		visibility: hidden;
	}
	50% {
		animation-timing-function: ease-in-out;
		visibility: visible;
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: -351.86;
	}
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.status {
  font-weight: bold;
  margin-top: 0px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 20px;
  opacity: 0.5; /* Adjust the opacity value */
  transition: opacity 0.2s; /* Add a smooth transition effect */
}

.status-open {
  background-color: green; /* Green with transparency */
  color: white;
}

.status-pending {
  background-color: gold; /* Orange with transparency */
  color: black;
}

.status-closed {
  background-color: red; /* Red with transparency */
  color: white;

}

/* ... any other status classes ... */

/* On hover, increase opacity for a subtle effect */
.status:hover {
  opacity: 1;
  transform: scale(1.05); /* Slightly bigger on hover */
  opacity: 1; /* Adjust the opacity value */

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
.issue-description {
  position: relative;
}

.short-description {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.full-description {
  display: none;
}

.issue-description .full-description {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
}
.hoverC:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */

} 

</style>
