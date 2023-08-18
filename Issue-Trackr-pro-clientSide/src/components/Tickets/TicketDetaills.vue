




<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

 
import { ref, onMounted } from 'vue';
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
let statusT = '';
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

onMounted(async () => {
  try {
    const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
    const ticketResponse = await axios.get(`http://localhost:8000/api/tickets/ticket/${ticket_id}`);
    
    Categories.value = categoriesResponse.data;
    ticketDb.value = ticketResponse.data[0];
    actualStatus.value = ticketDb.value.status;
    console.log("actualStatus.value :  "+ actualStatus.value);
    if(actualStatus.value == 'OPEN' || actualStatus.value == 'open'){
      statusIndex.value = 1;
    }else if(actualStatus.value == 'PENDING' || actualStatus.value == 'pending'){
      statusIndex = 2;
    }else if(actualStatus.value == 'CLOSED' || actualStatus.value == 'closed'){
      statusIndex = 3;
    }
    console.log("statusIndex :  "+ statusIndex.value); 
    console.log("ticketDb.value :  " );
    console.log(ticketDb.value);
    console.log("Categories.value  " );
    console.log(Categories.value);
    
    // Rest of your code...
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
let fromWho = ref('');

function saveTicket() {
  ticket.value.user_id= user.value.id;
  console.log("user.value.id: " + user.value.id);
  console.log("saveTicket");
  console.log(ticket.value);
  if (whosAuthenticated.value == 'USER'){
    ticket.value.status = 'FROM_USER'
    ticket.value.fromWho = 'FROM_USER'
    console.log("ticket.value.status from save : " + ticket.value.status);
    console.log("ticket.value.contentUpdate from save : " + ticket.value.contentUpdate);

}else if (whosAuthenticated.value == 'ADMIN'){
    ticket.value.fromWho = 'FROM_ADMIN'

}else if (whosAuthenticated.value == 'RESPONSIBLE'){
    ticket.value.fromWho = 'FROM_RESPONSIBLE'
}
if(ticket.value.contentUpdate  == ''){
  ticket.value.contentUpdate = 'NO_CHANGE';
}

console.log("ticket.value.status from save : " + ticket.value.status);
console.log("ticket.value.contentUpdate from save : " + ticket.value.contentUpdate);
  // save to database using axios
  if ((ticket.value.status == 0 || ticket.value.status == '0' ) && (ticket.value.contentUpdate == '' || ticket.value.contentUpdate == 'NO_CHANGE'))
    {
                ticket.value.contentUpdate = ''
                toaster.show(`<div><i class="fa-solid fa-triangle-exclamation"></i> You must change something to save !</div>`, {
                  position: "top",
                  duration: 5000,
                  type: "error",

                });
                 return;   
 
    }
  axios.post('http://localhost:8000/api/tickets', ticket.value)
  .then(function (response) {
    console.log("saveTicket succes");

    console.log(response);
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> ticket saved successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
    router.push({ name: 'ticketlist' });
  })
  .catch(function (error) {
    console.log(error);
  });



}

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
const statuses = ref(['OPEN','PENDING','CLOSED']);


function cancel() {
  router.push('/');
}

function deleteTicket(ticketId)

{
   const response = axios.delete('http://localhost:8000/api/tickets/'+ticketId);
    console.log('Deleted succefuly')
    toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Ticket Deleted succefuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "error",

                      });
    router.push('/ticketlist');

}

</script>



<template>

<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW ISSUE  -->
        <div >
          <div class="d-flex justify-content-end" style="margin-right: 100px; margin-top: 10px;">

          </div>
          <h1 style="text-align: center;" >Detaills of Tickets with id : #{{ ticket_id }}  </h1>
          
          <div  style="margin-bottom: 20px;" class="d-flex justify-content-around">  

                      <div  class="input-group input-group-lg mx-5">
                      <input type="email" class="form-control" id="Title" readonly  :value="ticketDb.title" aria-describedby="emailHelp" placeholder="Enter Ticket Title">
                      <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Title</label>
                        </div>
                      </div>
                  <div>
                  
                  </div>

                      <div class="input-group nput-group-lg rounded ">
                        <select disabled style="width: 200px;" class="custom-select" id="inputGroupSelect02">
                        <option v-for="(category, index) in Categories" :value="index + 1" :key="index" :selected="index + 1 === ticketDb.category_id">{{ category.name }}</option>
                     </select>
                        <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Category</label>
                        </div>
                      </div>
                          
                
                    </div>   

                    <div v-if="(whosAuthenticated == 'ADMIN' || whosAuthenticated == 'RESPONSIBLE')" style="margin-right: 150px;" ><!-- //status input  -->
                      <label style="font-size: large; margin-left: 300px; margin-bottom: 10px;" for="jdd"> Actual Status : <span style="color: red; font-size: 25px;">{{actualStatus}}</span></label>
                    <div class="input-group nput-group-lg rounded mx-5 d-flex justify-content-center "  >
                        <select v-model="actualStatusUpdate" style="width: 200px;" class="custom-select" id="inputGroupSelect02">

                        <option v-for="(status, index) in statuses" :value="status" :key="index" >{{ status }}</option>
                        </select>

                          
                        <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Status</label>
                        </div>
                        <div  style=" margin-left: 100px; display: block; " class="d-flex justify-content-center"> 
                        <button type="button" style="width: 50px; height: 50px;" @click="saveTicket()" class="btn btn-success btn-lg btn-block rounded-circle ">S</button>
                        <button type="button" style="width: 50px; height: 50px;" @click="cancel()" class="btn btn-danger btn-lg btn-block rounded-circle ">C</button>
                        <a style="width: 50px; height: 50px; margin-left: 100px;" @click="deleteTicket(ticketId)"  class="d-flex justify-content-center  btn btn-danger rounded-circle hoverC" href="#"> 
                                                  <div style="font-size: 18px ;margin-top: 8px; display: flex; justify-content: center;">
                                                    <i class="fa-solid fa-trash-can"></i>
  
                                                  </div>
                                              </a>
                        </div>
                        </div>
                      </div>
                      <div v-else  style="display: flex; justify-content: start; margin-left: 400px;">
                        <label style="font-size: large; margin-bottom: 10px;" for="jdd"> Actual Status : <span style="color: red; font-size: 25px;">{{actualStatus}}</span></label>
                        <div  style=" margin-left: 100px; display: block; " class="d-flex justify-content-center"> 
                        <button type="button" style="width: 50px; height: 50px;" @click="saveTicket()" class="btn btn-success btn-lg btn-block rounded-circle ">S</button>
                        <button type="button" style="width: 50px; height: 50px;" @click="cancel()" class="btn btn-danger btn-lg btn-block rounded-circle ">C</button>
                        <a style="width: 50px; height: 50px; margin-left: 100px;" @click="deleteTicket(ticketId)"  class="d-flex justify-content-center  btn btn-danger rounded-circle hoverC" href="#"> 
                                                  <div style="font-size: 18px ;margin-top: 8px; display: flex; justify-content: center;">
                                                    <i class="fa-solid fa-trash-can"></i>
  
                                                  </div>
                                              </a>
                      </div>
                      </div>

                  <div class="mx-5 d-flex justify-content-between" style="margin-top: 20px;" for="Content">
                    <h3>Issue Content</h3>
                    <h3 style="margin-right: 335px;" >History of Status</h3>
                  </div>

                 <div style="margin-top: 40px;" class="d-flex justify-content-between">
                    <div  style="margin-top: -80px; width: 600px;"  class="d-flex justify-content-around mx-5">  
                    <div class="input-group mt-5">
                    <textarea readonly :value="ticketDb.description" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    </div>
                    <div  style="margin-top: -80px;   width: 600px;"  class="d-flex justify-content-around mx-5">  
                      
                    <div style="border: 10px;"   class="input-group mt-5">
                    <textarea readonly :value="ticketDb.historyOfStatus" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    
                 </div>
                </div>
              

                <div class="mx-5 d-flex justify-content-center" style="margin-top: 20px;" for="Content">
                  <h3 >Add Comment to the content </h3>
                  </div>

                <div style="border: 10px; " class="input-group pt-3">
                   <textarea v-model="ticket.contentUpdate" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                  
                   </div>
          </div>
              

      </div>
      </div>
    
</template>

<style scoped>
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

</style>
        
    

