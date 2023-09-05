
<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

 
import { ref, onMounted ,onBeforeUnmount } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import axios from 'axios';

//get user from local storage
const user = ref(JSON.parse(localStorage.getItem('user')));
const Categories = ref([]);
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');


const ticketDb = ref({
});

let  actualStatusUpdate = ref(0);
let  contentUpdate = ref('');

//fetching ticket from the databess

const ticket_id = route.params.id;
const commentContent = ref('');
const ticket = ref({
    id: ticket_id,
    title: '',
    content : '',
    contentUpdate: '',
    category_id: '',
    status: actualStatusUpdate,
    user_id: '',
    fromWho: '',
    
});

var statusIndex = ref(0);
var actualStatus = ref('');

function getStatusName(statusId) {
  const status = statuses3.value.find(item => item.id === statusId);
  return status ? status.status : 'Unknown';
}
const statuses3 = ref([
    { id: 1, status: 'OPEN' },
    { id: 2, status: 'PENDING' },
    { id: 3, status: 'CLOSED' },
    ]);
// Toggle the full description visibility
function getStatusClass(status) {
  console.log("getStatusClass   the actual class is :  " + status);
  if (status === 'OPEN' || status === 'open'  || status === 'Open') {
    console.log("getStatusClass  OPEN veryfied" );
    return 'status-open';
  } else if (status === 'PENDING' || status === 'pending' || status === 'Pending') {
    console.log("getStatusClass  PENDING veryfied" );
    return 'status-pending';
  } else if (status === 'CLOSED'  || status === 'closed'  || status === 'Closed') {
    console.log("getStatusClass  CLOSED veryfied" );
    return 'status-closed';
  } else {
    console.log("getStatusClass  default veryfied" );
    return 'status-default'; // Provide a default class if status doesn't match
  }
}

async function fetchUpdatedStatus() {
  try {
    const response = await axios.get(`http://localhost:8000/api/tickets/ticket/${ticket_id}`);
    ticketDb.value = {
      id: response.data.id,
      title: response.data.title,
      content : response.data.description,
      category_id: response.data.category_id,
      status: getStatusName(response.data.status_id),
      user_id: response.data.user_id,
    }
  } catch (error) {
    console.error('Error fetching updated status:', error);
  }
}
onMounted(async () => {
  try {
    const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
    const ticketResponse = await axios.get(`http://localhost:8000/api/tickets/ticket/${ticket_id}`);
    actualStatus.value = getStatusName(ticketResponse.data.status_id);
    Categories.value = categoriesResponse.data;
    ticketDb.value = {
      id: ticketResponse.data.id,
      title: ticketResponse.data.title,
      content : ticketResponse.data.description,
      category_id: ticketResponse.data.category_id,
      status: getStatusName(ticketResponse.data.status_id),
      user_id: ticketResponse.data.user_id,
    }
      console.log("ticketDb.value.description :  ");
      console.log(ticketDb.value.description);


    }

  catch (error) {
    console.error('Error fetching data:', error);
  }}
);
let fromWho = ref('');


let statusT = '';
const tiketStatus = ref({
  status_id : '',
  ticket_id : ticket_id,
  changedByUser_id : user.value.id,
});


function changeStatus()
{
  //cheking if the status is null 
  if (actualStatusUpdate.value == 0 || actualStatusUpdate.value == '0' )
  {
    toaster.show(`<div><i class="fa-solid fa-triangle-exclamation"></i> You must change the status to save !</div>`, {
      position: "top",
      duration: 5000,
      type: "error",

    });
     return;   
  }

  //checking if the new status is the same as the old one
 else if (actualStatusUpdate.value == actualStatus.value)
  {
    toaster.show(`<div><i class="fa-solid fa-triangle-exclamation"></i> You must change the status to save !</div>`, {
      position: "top",
      duration: 5000,
      type: "error",

    });
     return;   
  }else {
    // add new record to ticketstatus table 
  tiketStatus.value.status_id = getStatusIdByName(actualStatusUpdate.value);
  console.log("tiketStatus.value.status_id : " + tiketStatus.value.status_id);
  console.log("actualStatusUpdate.value : " + actualStatusUpdate.value);

  axios.post('http://localhost:8000/api/statuses', tiketStatus.value)
  .then(function (response) {
    console.log("saveTicket succes");
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> ticket Status changed successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
                    router.push('/tickethistory/'+ticket_id);  
                    }
                    )
  }

  
                }

function getStatusIdByName (statusName){
  const status = statusesDb.value.find(item => item.status === statusName);
  return status ? status.id : 'Unknown';
}

// function getStatusName(statusId) {
//   const status = statuses.value.find(item => item.id === statusId);
//   return status ? status.status : 'Unknown';
// }

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
const statuses = ref(['OPEN','PENDING','CLOSED']);


function cancel() {
  router.push('/');
}

const ticketId = route.params.id;

function deleteTicket(ticketId)
{
  console.log("ticketId : " + ticketId);
const response = axios.delete('http://localhost:8000/api/tickets/'+ticketId)
console.log('Deleted succefuly')

     toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Ticket Deleted succefuly !</div>`, {
                         position: "top",
                         duration: 5000,
                         type: "error",
 
                       });
                       router.push('/ticketlist');
 
}

function saveComment ()
{
  const comment = {
    commentContent: commentContent.value,
    ticket_id: ticket_id,
    user_id: user.value.id,
  };
  console.log("comment : " + comment);
  axios.post('http://localhost:8000/api/comments', comment)
  .then(function (response) {
    console.log("saveComment succes");

    console.log(response);
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Comment saved successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
                      commentContent.value = '';
                      fetchComments()
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
  }



const currentTimestamp = ref(getActualDate());

const intervalId = setInterval(() => {
  currentTimestamp.value = getActualDate();
}, 1000); // Update every 1000 ms (1 second)

function getActualDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');

  const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTime;
}

// Clean up the interval when the component is unmounted
onBeforeUnmount(() => {
  clearInterval(intervalId);
});



import LoadingSpiner from '../Partials/LoadingSpiner.vue';
// creating a boolean to show the loading spinner
const loadingSpinner = ref(true);
// returning Loadingspinner to fals after 3 seconds
setTimeout(() => {
  loadingSpinner.value = false;
}, 1000);


// fetching the comments of the tickets by the ticket_id 
const comments = ref([]);
const statusesDb = ref([]);

var users = ref([]);
async function fetchComments() {
  try {
    const commentsResponse = await axios.get(`http://localhost:8000/api/comments/${ticket_id}`);
    comments.value = commentsResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function fetchStatuses() {
  try {
    const statusesResponse = await axios.get(`http://localhost:8000/api/statuses`);
    statusesDb.value = statusesResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function fetchUsers() {
  try {
    const usersResponse = await axios.get(`http://localhost:8000/api/users`);
    users.value = usersResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
onMounted(async () => {
  try {
    fetchUsers();
    fetchComments();
    fetchStatuses();

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Define the filter
const formatDate = (value) => {
  const date = new Date(value);
  // Format the date as 'YYYY-MM-DD HH:MM:SS'
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  return formattedDate;
};
function toTicketHisytory(){
  router.push({ name: 'TicketHistory', params: { id: ticket_id } });
}
function getUserNameById(user_id)
{
    console.log("user_id : " + user_id);
    const user = users.value.find(item => item.id === user_id);
    console.log("user : " );
    console.log(user);
    return user ? user.fullName : 'Unknown';
}
</script>



<template>

<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 

    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
      
      <!-- ADD NEW ISSUE  -->
      
      <div v-if="loadingSpinner" style="position: relative; top:200px;"  class="d-flex justify-content-center ">
                              <div style="position: relative; top: -10px;">
                                <LoadingSpiner  :isLoadingSpinerActive="loadingSpinner" > </LoadingSpiner>
                             </div>
                            </div>
          <div v-else>
            <div >
        <div class="d-flex justify-content-end" style="margin-right: 100px; margin-top: 10px;">
          
        </div>
          <h3 style="text-align: center; margin-bottom:25px;  " >Tickets with id : #{{ ticket_id }}  </h3>
          
          <div  style="margin-bottom: 20px;" class="d-flex justify-content-around">  
                      <div  class="input-group input-group-sm mx-5">
                      <input type="email" class="form-control" id="Title" readonly  :value="ticketDb.title" aria-describedby="emailHelp" placeholder="Enter Ticket Title">
                      <div class="input-group-append input-group-sm" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Title</label>
                        </div>
                      </div>
                  <div>
                  
                  </div>

                      <div class="input-group nput-group-sm rounded ">
                        <select disabled style="width: 200px;" class="custom-select" id="inputGroupSelect02">
                        <option v-for="(category, index) in Categories" :value="index + 1" :key="index" :selected="index + 1 === ticketDb.category_id">{{ category.name }}</option>
                     </select>
                        <div class="input-group-append input-group-sm" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Category</label>
                        </div>
                      </div>
                   
                        <div @click="toTicketHisytory()" class="hoverC" style="margin-left: -200px; margin-right:50px; margin-top:-10px; cursor: pointer; display: flex ; height: 10px;" >   <a @click="toTicketHisytory()" > <i style="font-size:45px;" class="fa fa-history" aria-hidden="true"></i> </a> </div>
                    </div>   

               <div v-if="(whosAuthenticated == 'ADMIN' || whosAuthenticated == 'RESPONSIBLE')" style="margin-right: 150px;" ><!-- //status input  -->
                      <div class="d-flex">
                        <label class="hoverCS status"  :class="getStatusClass(actualStatus)" style=" margin-top: -5px; font-size: large; margin-left: 300px; margin-bottom: 15px;" for="jdd"> <span style=" font-size: 25px;">{{actualStatus}}</span></label>
                        <div class="input-group nput-group-sm rounded mx-5 d-flex justify-content-center "  >
                            <select v-model="actualStatusUpdate" style="width: 200px; height: 30px;" class="custom-select" id="inputGroupSelect02">
    
                            <option v-for="(status, index) in statuses" :value="status" :key="index" >{{ status }}</option>
                          </select>
                          
                          
                          <div class="input-group-append input-group-sm" style="margin-left: 7px;">
                            <label class="input-group-text" for="inputGroupSelect02">Status</label>
                            </div>
                          </div>

                          <div  style=" margin-left: 100px; margin-top: -15px; display: block; " class="d-flex justify-content-center"> 
                            <button type="button" style="width: 140px; height: 40px; margin-left: 10px ; margin-top: 12px; font-size:12px;" @click="changeStatus()" class="btn btn-success btn-sm btn-block rounded-pill hoverC">Change Status</button>

                            <a style="width: 60px; height: 60px; margin-left: 10px;" @click="deleteTicket(ticketId)"  class="d-flex justify-content-center  btn btn-danger rounded-circle hoverC" href="#"> 
                                                    <div style="font-size: 20px ;margin-top: 13px; display: flex; justify-content: center;">
                                                      <i class="fa-solid fa-trash-can"></i>
    
                                                    </div>
                                </a>
                        </div>
                        </div>
                      </div>
                      <div v-else  style="display: flex; justify-content: start; margin-left: 400px;" >
                        <label class="hoverCS status" :class="getStatusClass(actualStatus)" style="font-size: large; margin-bottom: 10px;" for="jdd"><span style=" font-size: 25px;">{{actualStatus}}</span></label>
                        <div  style=" margin-left: 100px; display: block; " class="d-flex justify-content-center"> 
                        <a style="width: 40px; height: 40px; margin-left: 100px;" @click="deleteTicket(ticketId)"  class="d-flex justify-content-center  btn btn-danger rounded-circle hoverC" href="#"> 
                                                  <div style="font-size: 20px ;margin-top: 8px; display: flex; justify-content: center;">
                                                    <i class="fa-solid fa-trash-can"></i>
  
                                                  </div>
                                              </a>
                      </div>
                      </div>

                  <!-- <div class="mx-5 d-flex justify-content-between" style="margin-top: 20px;" for="Content">
                    <h4>Issue Content</h4>
                    <h4 style="margin-right: 335px;" >History of Status <img style="width: 40px ; height: 40px;" src="./TicketGifs/history.gif"> </h4>
                  </div>

                 <div style="margin-top: 40px;" class="d-flex justify-content-between">
                    <div  style="margin-top: -80px; width: 600px;"  class="d-flex justify-content-around mx-5">  
                    <div class="input-group mt-5">
                    <textarea readonly :value="ticketDb.description" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    </div> -->
                    <!-- <div  style="margin-top: -80px;   width: 600px;"  class="d-flex justify-content-around mx-5">  
                      
                    <div style="border: 10px;"   class="input-group mt-5">
                    <textarea readonly :value="ticketDb.historyOfStatus" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    
                 </div> -->
                <!-- </div> -->
              

                <!-- <div class="mx-5 d-flex justify-content-center" style="margin-top: 20px;" for="Content">
                  <h3 >Add Comment to the content </h3>
                  </div>

                <div style="border: 10px; " class="input-group pt-3">
                   <textarea v-model="ticket.contentUpdate" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                  
                   </div> -->
          </div>
              


                      <div class="ticket">
                                           <div class="card p-3">

                                        <div class="d-flex justify-content-between align-items-center">

                                        <div class="user d-flex flex-row align-items-center">

                                        <img src="./accountLogo.png" width="30" style="margin-right: 15px;" class="user-img rounded-circle mr-2">
                                        <span><small class="font-weight-bold text-primary" style="margin-right: 15px;">Ticket Content</small> </span>
                                          
                                        </div>

                                        <small>2023-08-15 12:44:57</small>

                                        </div>
                                        <div class="ticket-content" style="margin: 20px; white-space: pre-line;">
                                                    {{ticketDb.content}}
                                                </div>



                                        <div class="action mt-2 align-items-center">

                                        <!-- <div class="reply px-4">
                                          <small >Remove</small>
                                          <button type="button" style="width: 40px; height: 40px;" @click="cancel()" class="btn btn-danger btn-sm btn-block rounded-circle hoverC m-5 ">C</button>
                                          <small>Reply</small>
                                          <button type="button" style="width: 40px; height: 40px;" @click="saveTicket()" class="btn btn-success btn-sm btn-block rounded-circle hoverC">S</button>
                                          

                                          
                                        </div> -->
                                      


                                          
                                        </div>



                                        </div>
                      </div>

                <div class="comments">

                  <div class="container mt-5">

                              <div class="row  d-flex justify-content-center">

                                  <div class="col-md-8">

                                  

                                      
                                    <div v-for="comment in comments" class="card p-3">

                                                <div class="d-flex justify-content-between align-items-center">

                                                <div class="user d-flex flex-row align-items-center">

                                                <img src="./accountLogo.png" width="30" style="margin-right: 15px;" class="user-img rounded-circle mr-2">
                                                <span><small class="font-weight-bold text-primary" style="margin-right: 15px;">{{ getUserNameById(comment.user_id)}}</small></span>
                                                  
                                                </div>

                                                <small>{{formatDate(comment.commentedAt) }}</small>

                                                </div>
                                                <div class="comment-content " style="margin:20px;">
                                                {{ comment.commentContent }}
                                                </div>


                                                <div class="action mt-2 align-items-center">

                                                <!-- <div class="reply px-4">
                                                  <small >Remove</small>
                                                  <button type="button" style="width: 40px; height: 40px;" @click="cancel()" class="btn btn-danger btn-sm btn-block rounded-circle hoverC m-5 ">C</button>
                                                  <small>Reply</small>
                                                  <button type="button" style="width: 40px; height: 40px;" @click="saveTicket()" class="btn btn-success btn-sm btn-block rounded-circle hoverC">S</button>
                                                  

                                                  
                                                </div> -->
                                                <div class="d-flex justify-content-end">
                                                  

                                                </div>


                                                  
                                                </div>



                                                </div>

                                      <div class="card p-3">

                                          <div class="d-flex justify-content-between align-items-center">

                                          <div class="user d-flex flex-row align-items-center">

                                          <img src="./accountLogo.png" width="30" style="margin-right: 15px;" class="user-img rounded-circle mr-2">
                                          <span><small class="font-weight-bold text-primary" style="margin-right: 15px;">You'r Comment</small> </span>
                                            
                                          </div>

                                          <small>{{ currentTimestamp  }}</small>

                                          </div>
                                          <div class="comment-content " style="margin:20px;">
                                            <div style="border: 10px; " class="card">
                                          <textarea v-model="commentContent" class="" id="Content" rows="5" aria-label="With textarea"></textarea>
                                         
                                          </div>
                                          </div>


                                          <div class="action mt-2 align-items-center">

                                          <!-- <div class="reply px-4">
                                            <small >Remove</small>
                                            <button type="button" style="width: 40px; height: 40px;" @click="cancel()" class="btn btn-danger btn-sm btn-block rounded-circle hoverC m-5 ">C</button>
                                            <small>Reply</small>
                                            <button type="button" style="width: 40px; height: 40px;" @click="saveTicket()" class="btn btn-success btn-sm btn-block rounded-circle hoverC">S</button>
                                            

                                            
                                          </div> -->
                                          <div class="d-flex justify-content-end">
                                            <div>
                                              <button type="button" style="width: 100px; height: 40px; margin-right: 10px;" @click="saveComment()" class="btn btn-success btn-sm btn-block rounded-pill  hoverC ">Replay</button>
                                              <button type="button" style="width: 100px; height: 40px; margin-right: 50px;" @click="cancel()" class="btn btn-danger btn-sm btn-block rounded-pill hoverC  ">Cancel</button>

                                            </div>

                                          </div>


                                            
                                          </div>



                                        </div>
                                        



                                      
                                  </div>
                                  
                              </div>

                              </div>




                </div>

          </div>
      </div>
      </div>

</template>

<style scoped>

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
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
.custom-toast {
  background-color: #ffcc00;
}
.g-height-50 {
    height: 50px;
}

.g-width-50 {
    width: 50px !important;
}

@media (min-width: 0){
    .g-pa-30 {
        padding: 2.14286rem !important;
    }
}

.g-bg-secondary {
    background-color: #fafafa !important;
}

.u-shadow-v18 {
    box-shadow: 0 5px 10px -6px rgba(0, 0, 0, 0.15);
}

.g-color-gray-dark-v4 {
    color: #777 !important;
}

.g-font-size-12 {
    font-size: 0.85714rem !important;
}

.media-comment {
    margin-top:20px
}


.hoverC:hover {
  opacity: 1;
  transform: scale(1.2); /* Slightly bigger on hover */

}


body {
    background-color: #f7f6f6
}

.card {
    
    
    box-shadow: 7px 8px 8px 4px lightgray;
     /* making borders */


     border-right: 4px solid #1F4E7A;
     border-bottom: 4px solid #1F4E7A;
    border-radius: 10px;
    margin-bottom: 50px;

}


.dots{

    height: 4px;
  width: 4px;
  margin-bottom: 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.badge{

        padding: 7px;
        padding-right: 9px;
    padding-left: 16px;
    box-shadow: 5px 6px 6px 2px #e9ecef;
}

.user-img{

    margin-top: 4px;
}

.check-icon{

    font-size: 17px;
    color: #c3bfbf;
    top: 1px;
    position: relative;
    margin-left: 3px;
}

.form-check-input{
    margin-top: 6px;
    margin-left: -24px !important;
    cursor: pointer;
}


.form-check-input:focus{

    box-shadow: none;
}


.icons i{

    margin-left: 8px;
}
.reply{

    margin-left: 12px;
}

.reply small{

    color: #b7b4b4;

}


.reply small:hover{

    color: green;
    cursor: pointer;

}
</style>
        
    

