
<script setup>
import { ref } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth } from '@/components/sidebar/state.js';

const isNavbarOpen = ref(false);
const isDropdownOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>


<template>
  <div >
    <nav style="background-color: #1f4e7a;" class="navbar navbar-expand-lg navbar-dark ">
      
      <div style="display: flex; justify-content: end;" class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li style="margin-right: 50px;" class="nav-item dropdown">
              <div>NOT authenticated</div>
              <a  href="#" id="navbarDropdown" role="button" @click="toggleDropdown" aria-haspopup="true" aria-expanded="false">
                <img style="width: 40px;" src="./accountLogo.png" alt="logo">
              </a>
              <div class="dropdown-menu" :class="{ 'show': isDropdownOpen }" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/login">Login</a>
               
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
