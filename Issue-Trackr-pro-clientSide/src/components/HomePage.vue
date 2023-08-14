<script setup>
import UserHomePage from './HomePages/UserHomePage.vue';
import AdminHomePage from './HomePages/AdminHomePage.vue';
import ResponsibleHomePage from './HomePages/ResponsibleHomePage.vue';
import NotAuthenticatedHomePage from './HomePages/NotAuthenticatedHomePage.vue';
import MainNavBar from './MainNavBar.vue';

import { ref, onMounted } from 'vue';

// Create a reactive reference
const whosAuthenticated = ref('NOT_AUTHENTICATED');

console.log("whosAuthenticated: " + whosAuthenticated.value);
console.log("localStorage.getItem('token'): " + localStorage.getItem('token'));
console.log("localStorage.getItem('user'): " + localStorage.getItem('user'));
// console.log("localStorage.getItem('user').role: " + JSON.parse(localStorage.getItem('user')).role);

onMounted(() => {
   if (localStorage.getItem('token') == null) {
    var isAuthenticated = false; }
else{ var isAuthenticated = true; }
  if (!isAuthenticated) {
    whosAuthenticated.value = 'NOT_AUTHENTICATED';
  } else {
    // Fetching it from the LocalStorage
    var user = JSON.parse(localStorage.getItem('user'));
    if (user.role == 'USER') {
      whosAuthenticated.value = 'USER';
    } else if (user.role == 'RESPONSIBLE') {
      whosAuthenticated.value = 'RESPONSIBLE';
    
    } else if (user.role == 'ADMIN') {
        whosAuthenticated.value = 'ADMIN';}
    else{
        whosAuthenticated.value = 'NOT_AUTHENTICATED';
    }
  }
  console.log("whosAuthenticated: " + whosAuthenticated.value); 
});




</script>

<template>

        <div if>
            <div v-if="!(whosAuthenticated == 'NOT_AUTHENTICATED')" ><MainNavBar :whosAuthenticated=whosAuthenticated></MainNavBar> 
        </div>

        <div class="HomePages-comparison">
                <div v-if="whosAuthenticated == 'ADMIN'" :whosAuthenticated=whosAuthenticated> <AdminHomePage></AdminHomePage>  </div>
                <div v-else-if="whosAuthenticated == 'USER'" :whosAuthenticated=whosAuthenticated> <UserHomePage></UserHomePage></div>
                <div v-else-if="whosAuthenticated == 'RESPONSIBLE'" :whosAuthenticated=whosAuthenticated> <ResponsibleHomePage></ResponsibleHomePage> </div>
                <div v-else> <NotAuthenticatedHomePage></NotAuthenticatedHomePage> </div>
        </div>
         </div>

</template>

<style scoped>

</style>
