<script setup>
import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";
import RouterLinks from '../Partials/RouterLinks/RouterLinks.vue';
const toaster = createToaster({ /* options */ });

const user = ref(JSON.parse(localStorage.getItem('user')));
const categories = ref([]);
const router = useRouter();
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');

const newCategory = ref({
  name: '',
  description: '',
});

onMounted(async () => {
  const response = await axios.get('http://localhost:8000/api/categories');
  categories.value = response.data;
  setTitle()
});

function saveCategory() {
  axios.post('http://localhost:8000/api/categories', newCategory.value)
    .then(function (response) {
      console.log(response);
      toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Category saved successfuly !</div>`, {
                        position: "top",
                        duration: 5000,
                        type: "success",

                      });
          
    router.push({ name: '/' }); // Assuming you have a route named 'categorylist'
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value + 40}px`;
}

const props = defineProps({
  addORedit: {
    type: String,
  }
});
var title = ref('');
var subtitle = ref('');
function setTitle() {
      title.value = 'Add new Category';
}
import Title from '@/components/Partials/Title.vue';
import ListVue from '@/components/Partials/Lists/ListVue.vue';

function sayHello() {
  alert('Hello!');
}
function sayHello2() {
  alert('Hello2!');
}
function sayHello3() {
  alert('Hello3!');
}

let functions = [sayHello, sayHello2, sayHello3];
let bool = true;
onMounted(() => {
  console.log('mounted');
  bool = true;
});
</script>

<template>
<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW CATEGORY -->
        <!-- <RouterLinks to="/" icon="fa-solid fa-home" classeR=""  inlineText="home">Home</RouterLinks> -->
        <ListVue ></ListVue>
        <!-- <ListVue :listTitles="listTitles" :users="users" :userTicketCounts="userTicketCounts" :changeRole="changeRole" :deleteUser="deleteUser"></ListVue> -->

        <div>
          <Title :title="title" :subtitle="subtitle"></Title>
          <h3 class="mx-5" for="CategoryName">Category Name</h3>
            <div style="margin-bottom: 20px;" class="d-flex justify-content-around">  
                <div class="input-group input-group-lg mx-5">
                    <input type="text" class="form-control" v-model="newCategory.name" id="CategoryName" placeholder="Enter Category Name">
                </div>
            </div>

            <h3 class="mx-5" for="CategoryDescription">Category Description</h3>
            <div class="d-flex justify-content-around mx-5">  
                                       
                            
                            <div class="input-group mt-2">
                    <textarea v-model="newCategory.description" class="form-control" id="CategoryDescription" rows="5" aria-label="With textarea"></textarea>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-around" style="margin-top: 30px;">
            <button type="button" style="width: 100px; height: 100px;" @click="saveCategory()" class="btn btn-success btn-lg btn-block rounded-circle">Save</button>
            <button type="button" style="width: 100px; height: 100px;" class="btn btn-danger btn-lg btn-block rounded-circle">Cancel</button>
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

</style>
