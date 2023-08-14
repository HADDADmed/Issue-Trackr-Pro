<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import  UserNavBar from '../NavBars/UserNavbar.vue'

</script>

<template>



    <h1>HELLO from <strong style="color: red;">USER</strong> Home PAGE 👋</h1>


  <!-- explicit style -->
  <font-awesome-icon :icon="['fas', 'phone']" />

  <!-- implicit style (fas is assumed) -->
  <font-awesome-icon icon="phone" />


</template>

<style scoped>
</style>
