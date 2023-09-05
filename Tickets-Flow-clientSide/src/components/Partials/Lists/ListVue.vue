<script setup>
import Title from "../Title.vue";
import { ref, onMounted } from "vue";
import RouterLinks from "../RouterLinks/RouterLinks.vue";

/// define the props
const props = defineProps({
     listTitles: {
          type: Array,
     },
     Actions: {
          type: Array,
     },
     itemsToDisplay: {
          type: Array,
     },
     functionsOfActions: {
          type: Array,
     },
});
</script>

<template>
     <div id="app">
          <table class="table" style="border: 10px">
               <thead>
                    <tr>
                         <th v-for="listTitle in listTitles" scope="col">
                              {{ listTitle }}
                         </th>
                         <th v-for="Action in Actions" scope="col">
                              {{ Action.title }}
                         </th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="itemToDisplay in itemsToDisplay">
                         <td v-for="item in itemToDisplay" scope="row">
                              {{ item }}
                         </td>
                        <div></div>
                         <!-- <td>
                              <a
                                   @click="changeRole(user.id, user.role)"
                                   class="btn btn-sm bg-success hoverC"
                              >
                                   <i class="fa-solid fa-clock-rotate-left"> </i
                              ></a>
                         </td>
                         <td>
                              <a
                                   @click="deleteUser(user.id)"
                                   class="btn btn-sm bg-danger hoverC"
                              >
                                   <i class="fa-regular fa-trash-can"></i
                              ></a>
                         </td> -->
                    </tr>
               </tbody>
          </table>
     </div>
</template>

<style scoped>
#app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
}

#nav {
     padding: 30px;
}

#nav a {
     font-weight: bold;
     color: #2c3e50;
}

#nav a.router-link-exact-active {
     color: #42b983;
}
.ticketscount {
     text-decoration: none;
     font-weight: bold;
     margin-top: 0px;
     display: inline-block;
     padding: 4px 8px;
     border-radius: 20px;
     opacity: 0.5; /* Adjust the opacity value */
     transition: opacity 0.2s; /* Add a smooth transition effect */
     background-color: blue; /* Orange with transparency */
     color: white;
}
.ticketscount:hover {
     opacity: 1;
     transform: scale(1.2); /* Slightly bigger on hover */
     opacity: 1; /* Adjust the opacity value */
}
.hoverC:hover {
     opacity: 1;
     transform: scale(1.2); /* Slightly bigger on hover */
}
</style>
