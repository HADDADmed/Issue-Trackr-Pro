<script setup>
import  UserNavBar from './NavBars/UserNavbar.vue'
import  AdminNavBar from './NavBars/AdminNavbar.vue'
import  ResponsibleNavBar from './NavBars/ResponsibleNavbar.vue'
import NotAuthenticatedNavBar from './NavBars/NotAuthenticatedNavbar.vue'
import { onMounted } from 'vue';

const props = defineProps(['whosAuthenticated'])

</script>

<template>

            <div class="Navbar-comparison">
                <div v-if="props.whosAuthenticated == 'ADMIN'"> <AdminNavBar></AdminNavBar>  </div>
                <div v-else-if="props.whosAuthenticated == 'USER'"> <UserNavBar></UserNavBar> </div>
                <div v-else-if="props.whosAuthenticated == 'RESPONSIBLE'"> <ResponsibleNavBar></ResponsibleNavBar> </div>
                
            </div>
           


</template>

<style scoped>
</style>
