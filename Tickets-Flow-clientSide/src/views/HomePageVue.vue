<script setup>
import HomePage from '../components/HomePage.vue'
import AdminHomePage from '../components/HomePages/AdminHomePage.vue'
import UserHomePage from '../components/HomePages/UserHomePage.vue'
import ResponsibleHomePage from '../components/HomePages/ResponsibleHomePage.vue';
import MainNavBar from '../components/MainNavBar.vue';
import { ref, onMounted } from "vue";

const whosAuthenticated = ref(
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("user")).role
    : "NOT_AUTHENTICATED"
);
console.log("Main Home Page loaded");
</script>

<template>
   <div>
     <div>
       <MainNavBar :whosAuthenticated="whosAuthenticated"></MainNavBar>
     </div>
 
         <div class="HomePages-comparison">
            <div v-if="whosAuthenticated == 'ADMIN'">
               <AdminHomePage></AdminHomePage>
            </div>
            <div v-else-if="whosAuthenticated == 'USER'">
               <UserHomePage></UserHomePage>
            </div>
            <div v-else-if="whosAuthenticated == 'RESPONSIBLE'">
               <ResponsibleHomePage></ResponsibleHomePage>
            </div>
     </div>
   </div>
 </template>
 
 <style scoped></style>