<script setup>
import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
});

function saveCategory() {
  axios.post('http://localhost:8000/api/categories', newCategory.value)
    .then(function (response) {
      console.log(response);
      alert("Category Added");
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
</script>

<template>
<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW CATEGORY -->
        <div>
            <h1 style="text-align: center;">Add New Category</h1>

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
/* Your styles here */
</style>
