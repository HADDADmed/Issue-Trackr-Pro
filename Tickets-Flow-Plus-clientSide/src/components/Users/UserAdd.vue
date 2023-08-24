<script setup>
import MainNavBar from '../MainNavBar.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { sidebarWidthNum } from '../sidebar/state';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ /* options */ });

const user = ref(JSON.parse(localStorage.getItem('user')));
const categories = ref([]);
const router = useRouter();
const whosAuthenticated = ref(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')).role : 'NOT_AUTHENTICATED');



function sidebarWidthNumf() {
  return `${sidebarWidthNum.value + 40}px`;
}

onMounted(async () => {
  setTitle()
});
var title = ref('');
var subtitle = ref('');
function setTitle() {
      title.value = 'Add new User';
}
const UsersRoles =[
    
    {
        role: 'USER',
        class: 'user'
    },
    {
        role: 'RESPONSIBLE',
        class: 'admin'
    } ,
    {
        role: 'ADMIN',
        class: 'admin'
    }
   
]
import Title from '@/components/Partials/Title.vue';

const newUser = ref({
    fullName: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    birthDate: '',
    hiringDate: '',
    passwordConfirmation: ''
});
function createUser() {

    if(newUser.value.password != newUser.value.passwordConfirmation){
        newUser.value.password = '';
        newUser.value.passwordConfirmation = '';
        toaster.show(`<div><i class="fa-solid fa-circle-exclamation"></i> Passwords are not the same !</div> <div style="display:flex; justify-content:center;">Please Try again</div>`, {
                        position: "bottom-right",
                        duration: 5000,
                        type: "warning",

                      });
        return;
    }else{
        axios.post('http://localhost:8000/api/users/register', newUser.value)
          .then(function (response) {
            console.log(response);
            toaster.show(`<div><i class="fa-solid fa-circle-check"></i> User Created successfuly !</div>`, {
                              position: "bottom-right",
                              duration: 5000,
                              type: "success",
      
                            });
                
           router.push('/'); // Assuming you have a route named 'categorylist'
          })
          .catch(function (error) {
            console.log(error);
          });
    }


}

</script>

<template>
<div id="app">
    <Sidebar></Sidebar>
    <MainNavBar></MainNavBar> 
    <div style="margin: 40px 40px 40px 0px; " :style="{ 'margin-left': sidebarWidthNumf() }" >
        <!-- ADD NEW CATEGORY -->
        <div>
            <Title :title="title" :subtitle="subtitle"></Title>
            <div class="container">
        

    
    <div class="row ">
      <div class="col-lg-7 mx-auto">
        <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
       
            <div class = "container">
     <form @submit.prevent="createUser()" id="contact-form" role="form">

            

            <div class="controls">

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_fullName">Full Name *</label>
                            <input id="form_fullName" type="text" v-model="newUser.fullName" class="form-control" placeholder="enter the User full Name *" required="required" data-error="Firstname is required.">
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_phoneNumber">Phone number *</label>
                            <input id="form_phoneNumber" type="text"  v-model="newUser.phoneNumber"  name="surname" class="form-control" placeholder="enter the User phone number *" required="required" data-error="Lastname is required.">
                                                            </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_email">Email *</label>
                            <input id="form_email" type="email" name="email" v-model="newUser.email"  class="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required.">
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="color: red;" for="form_role">Select the user Role *</label>
                            <select v-model="newUser.role"  id="form_role" name="role" class="form-control" required="required" data-error="Please specify the role.">
                                <option value="" selected disabled>--Select  Role--</option>
                                <option  v-for="UserRole in UsersRoles" :class="UserRole.class" >{{UserRole.role}}</option>

                            </select>
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_hiringDate">Hiring Date *</label>
                            <input id="form_hiringDate" v-model="newUser.hiringDate"  type="date" name="hiringDate" class="form-control"  required="required" data-error="Hiring date is required.">
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_birthDate">Birth Date </label>
                            <input id="form_birthDate" v-model="newUser.birthDate" type="date" name="birthDate" class="form-control"  >
                            
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 30px;">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_password">Access Pasword *</label>
                            <input id="form_password" v-model="newUser.password"  type="password" name="empasswordail" class="form-control" placeholder="enter the User Access Pasword *" required="required" data-error="Pleas enter the Pasword.">
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_passwordConfirmation">Confirm Pasword *</label>
                            <input id="form_passwordConfirmation" type="password" v-model="newUser.passwordConfirmation"  name="passwordConfirmation" class="form-control" placeholder="comfirm the Access Pasword *" required="required" data-error="Pleas enter the Pasword comfirmation.">                 
                        </div>
                    </div>
                </div>

                <div class="col-md-12 d-flex justify-conetent-center" style="margin-top: 30px; margin-left: 50px;" >
                        
                    <input type="submit"  class="btn  btn-send  pt-2 btn-block submitButton" value="Create The User" >
                    
                </div>

        </div>
         </form>
        </div>
            </div>


    </div>
        <!-- /.8 -->

    </div>
    <!-- /.row-->

</div>
</div>
</div>

    </div>
</div>


</template>

<style scoped>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.user{
    color: green;
}
.admin{
    color: red;
    font-size: large;
}
body {
    font-family: 'Lato', sans-serif;
}

h1 {
    margin-bottom: 40px;
}

label {
    color: #333;
}

.btn-send {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    width: 80%;
    margin-left: 3px;
    }
.help-block.with-errors {
    color: #ff5050;
    margin-top: 5px;

}

.card{
	margin-left: 10px;
	margin-right: 10px;
}
.submitButton {
    background: linear-gradient(to right, red 0%, red 100%);
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 1em;
}

</style>
