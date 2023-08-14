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
    
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">MainhomePage</SidebarLink>
<SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeuser" icon="fas fa-home">homeuser</SidebarLink>
<SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeadmin" icon="fas fa-columns">homeadmin</SidebarLink>
<SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeresponsible" icon="fas fa-chart-bar">homeresponsible</SidebarLink>
<SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homenotauthenticated" icon="fas fa-users">notauthenticated</SidebarLink>
<SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/login" icon="fas fa-image">login</SidebarLink>
      </div>
      <div v-else-if="whosAuthenticated == 'ADMIN'">
    
    <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">Liste Of Users </SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeadminresponsibles" icon="fas fa-home">List of Rspsibles</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeadmin" icon="fas fa-columns">List Of All Issues</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 50px;" to="/logoutpl" icon="fas fa-chart-bar">Logout</SidebarLink>

        </div>
        <div v-if="whosAuthenticated == 'RESPONSIBLE'">
    
    <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/" icon="fas fa-users">MainhomePage</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeuser" icon="fas fa-home">homeuser</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeadmin" icon="fas fa-columns">homeadmin</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homeresponsible" icon="fas fa-chart-bar">homeresponsible</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/homenotauthenticated" icon="fas fa-users">notauthenticated</SidebarLink>
  <SidebarLink style="margin-left: -10px; margin-top: 15px;" to="/login" icon="fas fa-image">login</SidebarLink>
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

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>
