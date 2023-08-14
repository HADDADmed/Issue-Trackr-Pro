<script setup>
import NotAuthenticatedNavBar from '@/components/NavBars/NotAuthenticatedNavBar.vue'
import router from '../../router';
import { onMounted } from 'vue';

console.log("localStorage.getItem('token'): " + localStorage.getItem('token'));
onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push('/home')
    }
})

</script>

<template>
        <div > <NotAuthenticatedNavBar></NotAuthenticatedNavBar> </div>
    <h1>HELLO from <strong style="color: red;">NotAuthenticated</strong> Home PAGE 👋</h1>

</template>

<style scoped>
</style>
