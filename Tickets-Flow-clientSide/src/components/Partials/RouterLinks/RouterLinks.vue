<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { collapsed } from './state'
export default {
  props: {
    to: { type: String, required: false },
    icon: { type: String, required: true },
    classeR: { type: String, required: true },
    inlineText: { type: String, required: false },
    returnLineText: { type: String, required: false },
    //jason that containe the function name and the function parameters
    functionForActions: { type: Array, required: false },
    
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter() // Add this line to get the router instance
    const isActive = computed(() => route.path === props.to)
    return { isActive, collapsed }
  }
}



</script>



<template>
            <div v-if="functionsForActions"> 
              <a @click="functionForActions.name(functionForActions.parameters)"  :class="classeR" >
                  <i class="icon" :class="icon" /> {{  inlineText ? inlineText : '' }}
  
                                <transition name="fade">
                                    <div>
                                      {{  returnLineText ? returnLineText : '' }}
                                    </div>
                                </transition>
              </a>
            </div>
            <div v-else>

              <router-link :to="to"  :class="classeR">
                  <i class="icon" :class="icon" /> {{  inlineText ? inlineText : '' }}
  
                                <transition name="fade">
                                    <div>
                                      {{  returnLineText ? returnLineText : '' }}
                                    </div>
                                </transition>
              </router-link>
              
            </div>



</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 500;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;

  color: black;
  text-decoration: none;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
