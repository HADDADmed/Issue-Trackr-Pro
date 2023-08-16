
<script setup>
import { ref } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const isNavbarOpen = ref(false);
const isDropdownOpen = ref(false);
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push({ name: 'home' });
}
</script>


<template>
  <div :style="{ 'margin-left': sidebarWidth }">
    <nav style="background-color: #1f4e7a;" class="navbar navbar-expand-lg navbar-dark ">
      
      <div style="display: flex; justify-content: end;" class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }" id="navbarSupportedContent">
        <a style="font-size: 15px;" class="navbar-brand "  href="#">{{user.fullName}} <span style="color: red;">RESPONSIBLE</span></a>
        <ul class="navbar-nav">
            <li style="margin-right: 50px;" class="nav-item dropdown">
              <a  href="#" id="navbarDropdown" role="button" @click="toggleDropdown" aria-haspopup="true" aria-expanded="false">
                <img style="width: 40px;" src="./accountLogo.png" alt="logo">
              </a>
              <div class="dropdown-menu" :class="{ 'show': isDropdownOpen }" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" @click="logOut()">Logout</a>
              </div>
            </li>
        </ul>
      </div>
     
    </nav>
  
  </div>
</template>
 



<style>
.dropdown-menu {
  position: absolute;
  left: 50px;
  top: 100%;
  transform: translateX(-100%);
  display: none;
}

.show {
  display: block;
}
/* Your custom styles can go here */
</style>
