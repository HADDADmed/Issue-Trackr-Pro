<script setup>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'


 const user = localStorage.getItem('user')
  const userJson = JSON.parse(user)
  const whosAuthenticated = userJson.role
 
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        
      </span>
      <span v-else>
         <img style="width: 150px; margin-left: 15px; margin-top: 10px;" src="./Logocroped.png"  alt="Logo">        
         <img style="width: 60px;  margin-top: -5px;" src="./LogoPro.png"  alt="Logo">
      </span>
      
    </h1>
    <div style="margin-top: 50px;">

      <div v-if="whosAuthenticated == 'USER'">
    
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">Home Page</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/ticketlist" icon="fas fa-columns">List Of All Issues</SidebarLink>

      </div>
      <div v-else-if="whosAuthenticated == 'ADMIN'">
    
    <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">Liste Of Users </SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeadminresponsibles" icon="fas fa-home">List of Rspsibles</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/ticketlist" icon="fas fa-columns">List Of All Issues</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/categoryadd" icon="fas fa-columns">Add  category</SidebarLink>

        </div>
        <div v-if="whosAuthenticated == 'RESPONSIBLE'">
    
    <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">Home Page </SidebarLink>
    <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/ticketlist" icon="fas fa-users">List Of All Issues</SidebarLink>

        </div>

<span
  class="collapse-icon"
  :class="{ 'rotate-180': collapsed }"
  @click="toggleSidebar"
>
  <i class="fas fa-angle-double-left" />
</span>
    </div>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #1f4e7a;     /* Even darker blue */
  --sidebar-item-hover: #1a435f;   /* Darker blue */
  --sidebar-item-active: #163b50;  /* Darkest blue */
}


</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  /* Enable scrolling and hide the scrollbar */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

/* Hide the scrollbar for WebKit browsers */
.sidebar::-webkit-scrollbar {
  width: 0.5em;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.sidebar::-webkit-scrollbar-track {
  background-color: transparent;
}


.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: sticky; /* Use sticky positioning */
  bottom: 0;
  left: 100px;
  padding: 0.70em;
  margin-top: 30px;
  color: red;

  /* Add a white rounded contour */
  border: 4px solid white;
  border-radius: 50%;

  /* Center the icon */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Ensure a perfect circle */
  width: 1.5em;
  height: 1.5em;

  /* Transition and other styles */
  transition: 0.3s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.3s linear;
}

</style>
