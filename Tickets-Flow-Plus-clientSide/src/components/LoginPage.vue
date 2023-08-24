<script >
import anime from 'animejs'; // Make sure you have animejs installed
import axios from 'axios';
import { ref } from 'vue';
import router from '../router';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });
export default {
  data() {
    return {
      currentAnimation: null,
      passwordType: 'password',
      mail: '',
      password: '',
      errorMessage: ''

    };
  },
  methods: {
    handleFocus(targetId) {
      if (this.currentAnimation) {
        this.currentAnimation.pause();
      }

      switch (targetId) {
        case 'email':
          this.currentAnimation = anime({
            targets: 'path',
            strokeDashoffset: {
              value: 0,
              duration: 800,
              easing: 'easeOutQuart',
            },
            strokeDasharray: {
              value: '240 1386',
              duration: 800,
              easing: 'easeOutQuart',
            },
          });
          break;
        case 'password':
          this.currentAnimation = anime({
            targets: 'path',
            strokeDashoffset: {
              value: -336,
              duration: 800,
              easing: 'easeOutQuart',
            },
            strokeDasharray: {
              value: '240 1386',
              duration: 800,
              easing: 'easeOutQuart',
            },
          });
          break;
        case 'submit':
          this.currentAnimation = anime({
            targets: 'path',
            strokeDashoffset: {
              value: -730,
              duration: 800,
              easing: 'easeOutQuart',
            },
            strokeDasharray: {
              value: '530 1386',
              duration: 700,
              easing: 'easeOutQuart',
            },
          });
          break;
      }
    },
    async login() {
          try {
          const response = await axios.post('http://localhost:8000/api/users/login', {
          email: this.mail,
          password: this.password
          })
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          //set whosAuthenticated to the local storage
          localStorage.setItem('whosAuthenticated', JSON.stringify(response.data.user.role));
          const whosAuthenticated = localStorage.getItem('whosAuthenticated');
          console.log("whosAuthenticated From Login: " + whosAuthenticated); 
          toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Welcome  ${response.data.user.fullName} to TicketsFlowPlus !</div>`, {
              position: "top",
              duration: 5000,
              type: "success",

            });
             router.push('/home');
          if (response.status === 200) {
          this.errorMessage = '';
          // Redirect to a new page or perform some action upon successful login
          }
          } catch (error) {
          if (error.response) {
            toaster.show(`<div><i class="fa-solid fa-triangle-exclamation"></i> Invalide Credentials  !</div>`, {
              position: "top",
              duration: 5000,
              type: "error",

            });
          this.errorMessage = error.response.data.error;
          } else {
            toaster.show(`<div><i class="fa-solid fa-triangle-exclamation"></i> Invalide Credentials  !</div>`, {
              position: "top",
              duration: 5000,
              type: "error",

            });
          this.errorMessage = 'An error occurred';
          }
          }
}
  },
};
</script>

<template>


<div class="page">
  <div class="container">
    <div class="left">
      <div class="login">Login to TicketsFlowPlus</div>
      <div class="eula">Welcome to TicketsFlowPlus ! <br> By logging in you agree to our terms and conditions.</div>
      <p style="color: red; text-align: center;  margin-top:-10px;font-size:20px;" v-if="errorMessage"> {{ errorMessage }}</p>

    </div>
    <div class="right">
      <svg viewBox="0 0 320 300">
        <defs>
          <linearGradient
                          inkscape:collect="always"
                          id="linearGradient"
                          x1="13"
                          y1="193.49992"
                          x2="307"
                          y2="193.49992"
                          gradientUnits="userSpaceOnUse">
            <stop
                  style="stop-color:red;"
                  offset="0"
                  id="stop876" />
            <stop
                  style="stop-color:gold;"
                  offset="1"
                  id="stop878" />
          </linearGradient>
        </defs>
        <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
      </svg>
      <div class="form">
        <label for="email" >Email</label>
        <input type="email" @focus="handleFocus('email')"  v-model="mail"  id="email">
        <label for="password">Password</label>
        <input type="password" @focus="handleFocus('password')"   v-model="password"  id="password">
        <input type="submit" id="submit"  @focus="handleFocus('submit')" value="Submit"  @click="login()">
      </div>
    </div>
  </div>
</div>


</template>

<style scoped>
@import url('https://rsms.me/inter/inter-ui.css');
::selection {
  background: #2D2F36;
}
::-webkit-selection {
  background: #2D2F36;
}
::-moz-selection {
  background: #2D2F36;
}
body {
  background: white;
  font-family: 'Inter UI', sans-serif;
  margin: 0;
  padding: 20px;
}
.page {
  background: #BFD7ED;
  display: flex;
  flex-direction: column;
  height: calc(100%);
  position: absolute;
  place-content: center;
  width: calc(100% );
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: #60A3D9;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
    text-align: center;

  font-size: 30px;
  font-weight: 800;
  margin: 10px 10px 20px;
}
.eula {
    text-align: center;

  color: white;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  margin: 20px;
 margin-top: 40px;

}
.right {
  background: #003B73;
  box-shadow: 0px 0px 40px 16px rgba(0,0,0,0.22);
  color: #F1F1F2;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);;
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
}
label {
  color:  #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner { 
  border: 0; 
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}

</style>
