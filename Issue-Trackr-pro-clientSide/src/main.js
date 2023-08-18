
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/js/all'
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Toaster from '@meforma/vue-toaster';

// You can use the following starter router instead of the default one as a clean starting point
// import router from "./router/starter";
import router from "./router";




// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// Craft new application
const app = createApp(App);


// Use Pinia and Vue Router
app.use(createPinia());
app.use(router);
app.use(Toaster);

// Use Toaster




// ..and finally mount it!
app.mount("#app");
