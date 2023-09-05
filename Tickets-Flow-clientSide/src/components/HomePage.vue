<script setup>
import UserHomePage from "./HomePages/UserHomePage.vue";
import AdminHomePage from "./HomePages/AdminHomePage.vue";
import ResponsibleHomePage from "./HomePages/ResponsibleHomePage.vue";
import NotAuthenticatedHomePage from "./HomePages/NotAuthenticatedHomePage.vue";
import MainNavBar from "./MainNavBar.vue";
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
