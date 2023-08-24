<script setup>

import { defineProps } from 'vue'



const props = defineProps({
  title: String,
    subtitle: String,
})

let fontColor = 'green'

 

</script>


<template>
    <div class="d-flex justify-content-center">
      <div style="margin-left: 20px;">
        <div class="three">
          <h1>
            <span class="underline-bg"></span>
            {{ title }}
          </h1>
          <span id="o">{{ subtitle }}</span>
        
        </div>
      </div>
    </div>
  </template>
  

  <style scoped>
  #o{
    font-size: 15px;
    font-weight: 600;
    line-height: 1.5em;
    padding-bottom: 15px;
    position: relative;
    color: #080808;
    background: linear-gradient(to right, red 0%, red 100%); /* Gradient for the underline effect */
    background-position: center bottom;
    background-size: 100% 2px; /* Thinner line for the underline effect */
    background-repeat: no-repeat;
    transition: background-size 0.4s ease;
    
  }
  .three h1 {
    font-size: 50px;
    font-weight: 700;
    letter-spacing: 4px;
    line-height: 1.5em;
    padding-bottom: 15px;
    position: relative;
    color: #080808;
    background: linear-gradient(to right, red 0%, red 100%); /* Gradient for the underline effect */
    background-position: center bottom;
    background-size: 100% 2px; /* Thinner line for the underline effect */
    background-repeat: no-repeat;
    transition: background-size 0.4s ease;
  }
  
  .three h1:hover {
    background-size: 0% 2px; /* Adjust to control the disappearing effect */
  }
  
  .underline-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 8px;
    width: 100px;
    background-color: red; /* Adjust the color to match */
    z-index: -1;
  }
  
  .three h1 span {
    display: block;
    font-size: 0.5em;
    line-height: 1.3;
  }
  
  .three {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  
  .three h1 em {
    font-style: normal;
    font-weight: 600;
  }
  </style>
  