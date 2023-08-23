<template>


<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <div>
          <Title :title="title" :subtitle="subtitle"></Title>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="category.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <a @click="deleteCategory(category.id)" class="btn btn-sm bg-danger hoverC" > <i class="fa-regular fa-trash-can"></i></a>  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
  import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { createToaster } from "@meforma/vue-toaster";
  import { sidebarWidthNum } from '../sidebar/state';

const toaster = createToaster({ /* options */ });

function sidebarWidthNumf() {
  return `${sidebarWidthNum.value + 40}px`;
}

  const categories = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories').then(response => {
        categories.value = response.data;
        setTitle();
      })
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });

  function deleteCategory (id) {
    axios.delete(`http://localhost:8000/api/categories/${id}`)
      .then(response => {
        categories.value = categories.value.filter(category => category.id !== id);
        toaster.success("Category deleted successfully");
        router.push({ name: 'CategoryList' });        
      })
      .catch(error => {
        console.error('Error deleting category:', error);
        toaster.error("Error deleting category");
      });
  }
  var title = ref('');
var subtitle = ref('');
async function setTitle() {
  subtitle.value = 'count of Categories: ' + categories.value.length;
  title.value = 'List of all Categories ';
}
  import Title from '@/components/Partials/Title.vue';
  </script>
  



  <style scoped>
  .hoverC:hover{
    opacity: 1;
  transform: scale(1.05); /* Slightly bigger on hover */
  opacity: 1; /* Adjust the opacity value */
  }
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



  </style>
