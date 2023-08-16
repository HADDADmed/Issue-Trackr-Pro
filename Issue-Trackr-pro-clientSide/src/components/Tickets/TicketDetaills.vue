




<script setup>

import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';

import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';

//get user from local storage
const user = ref(JSON.parse(localStorage.getItem('user')));
const Categories = ref([]);
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
const ticket_id = route.params.id;
console.log("ticket_id: " + ticket_id);



//fetching ticket from the databess

let statusT = '';
const ticket = ref({
    id: ticket_id,
    title: '',
    content: '',
    category_id: '',
    status: statusT,
    user_id: '',
    
});
const ticketDb = ref({
});

var statusIndex = ref(0);
var actualStatus = ref('');

  onMounted(async () => {
    const response = await fetch('http://localhost:8000/api/categories');
    const response2 = await fetch('http://localhost:8000/api/tickets/ticket/' + ticket_id);
    const data = await response.json();
    const data2 = await response2.json();
    Categories.value = data;
    ticketDb.value = data2[0];
    actualStatus.value = ticketDb.value.status;
    console.log("categories :  " )
    console.log( Categories.value);
    console.log("ticketDb :  " )
    console.log( ticketDb.value);
    console.log("status index :"+ticketDb.value.status);
    if(ticketDb.value.status == 'OPEN' || ticketDb.value.status == 'open'){
        statusIndex.value = 1;
    }else if(ticketDb.value.status == 'PENDING' || ticketDb.value.status == 'pending'){
        statusIndex.value =  2;
    }else if(ticketDb.value.status == 'CLOSED' || ticketDb.value.status == 'closed'){
        statusIndex.value =  3;
    }
 console.log("status index 2:"+statusIndex.value);

});

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value +40}px`;
}
const statuses = ref(['OPEN','PENDING','CLOSED']);



</script>



<template>

<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW ISSUE  -->
        <div >
                    <h1 style="text-align: center;" >Add New Issue</h1>

                    <h3 class="mx-5" for="Title">Title</h3>

                    <div  style="margin-bottom: 20px;" class="d-flex justify-content-around">  

                      <div  class="input-group input-group-lg mx-5">
                      <input type="email" class="form-control" id="Title" readonly  :value="ticketDb.title" aria-describedby="emailHelp" placeholder="Enter Ticket Title">
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
                    <div class="input-group nput-group-lg rounded mx-5 d-flex justify-content-center "  >
                        <label style="font-size: large; margin-right: 15px;" for="jdd"> Actual Status : <span style="color: red; font-size: 25px;">{{actualStatus}}</span></label>
                        <select v-model="actualStatus" style="width: 200px;" class="custom-select" id="inputGroupSelect02">

                        <option v-for="(status, index) in statuses" :value="index + 1" :key="index" :selected="index + 1 === statusIndex">{{ status }}</option>
                        </select>


                        <div class="input-group-append input-group-lg" style="margin-left: 7px;">
                          <label class="input-group-text" for="inputGroupSelect02">Status</label>
                        </div>
                        </div></div>

                  <div class="mx-5 d-flex justify-content-between" style="margin-top: 30px;" for="Content">
                    <h3>Issue Content</h3>
                    <h3 style="margin-right: 345px;" >History of Status</h3>
                  </div>

                 <div style="margin-top: 40px;" class="d-flex justify-content-between">
                    <div  style="margin-top: -50px; width: 600px;"  class="d-flex justify-content-around mx-5">  
                    <div class="input-group mt-5">
                    <textarea readonly :value="ticketDb.description" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                    </div>
                    <div  style="margin-top: -50px;  width: 600px;"  class="d-flex justify-content-around mx-5">  
                    <div class="input-group mt-5">
                    <textarea readonly :value="ticketDb.historyOfStatus" class="form-control" id="Content" rows="5" aria-label="With textarea"></textarea>
                    </div>
                 </div>
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
</style>
        
    

