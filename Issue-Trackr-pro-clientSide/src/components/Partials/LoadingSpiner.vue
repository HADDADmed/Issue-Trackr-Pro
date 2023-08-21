<script setup>

import { defineProps } from 'vue'



const props = defineProps({
  isLoadingSpinerActive: Boolean,
})





</script>


<template>


<svg class="loader" viewBox="0 0 100 100">
  
  <g class="points"> 
    <circle class="ciw" cx="50" cy="50" r="50" fill="#1F4E7A"  />
  <circle class="ci2" cx="5" cy="50" r="4" />
  <circle class="ci1" cx="95" cy="50" r="4" />
    </g>
</svg>
    



</template>



<style scoped >

.loader {
  width: 8vw;
  max-height: 90vh;
  transform-origin: 50% 50%;
  overflow: visible;
  .ci1 {
    fill: white;
    animation: toBig 3s infinite -1.5s;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }
  .ciw {
    transform-box: fill-box;
    transform-origin: 50% 50%;
   
    animation: breath 3s infinite;
  }

  .ci2 {
    fill: white;
    animation: toBig2 3s infinite;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }
}
.points {
  animation: rot 3s infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(360deg);
  }
  80% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes toBig {
  0% {
    transform: scale(1) translateX(0px);
  }
  30% {
    transform: scale(1) translateX(0px);
  }
  50% {
    transform: scale(10) translateX(-4.5px);
  }
  80% {
    transform: scale(10) translateX(-4.5px);
  }
  100% {
    transform: scale(1) translateX(0px);
  }
}
@keyframes toBig2 {
  0% {
    transform: scale(1) translateX(0px);
  }
  30% {
    transform: scale(1) translateX(0px);
  }
  50% {
    transform: scale(10) translateX(4.5px);
  }
  80% {
    transform: scale(10) translateX(4.5px);
  }
  100% {
    transform: scale(1) translateX(0px);
  }
}
@keyframes breath {
  15% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.1);
  }
  65% {
    transform: scale(1);
  }

  90% {
    transform: scale(1.1);
  }
}

@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

*,
*:before,
*:after {
  position: relative;
  box-sizing: border-box;
}





</style>