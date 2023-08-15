<script setup>
import  UserNavBar from './NavBars/UserNavbar.vue'
import  AdminNavBar from './NavBars/AdminNavbar.vue'
import  ResponsibleNavBar from './NavBars/ResponsibleNavbar.vue'
import NotAuthenticatedNavBar from './NavBars/NotAuthenticatedNavbar.vue'
import { onMounted, ref } from 'vue';

const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');
console.log("FROM main NAV 1  "+whosAuthenticated.value);

</script>

<template>
            <div class="Navbar-comparison">
                <div v-if="whosAuthenticated == 'ADMIN'"> <AdminNavBar></AdminNavBar>  </div>
                <div v-else-if="whosAuthenticated == 'USER'"> <UserNavBar></UserNavBar> </div>
                <div v-else-if="whosAuthenticated == 'RESPONSIBLE'"> <ResponsibleNavBar></ResponsibleNavBar> </div>      
            </div>     
</template>

<style scoped>
</style>
