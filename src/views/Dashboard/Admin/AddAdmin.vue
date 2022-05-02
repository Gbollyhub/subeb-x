<template>
    <div>

   <MobileTopbar/>
  <div class="dashboard-row">
 <notifications/>
   <Loader v-show="loading"/>
 <SideBar/>
    <div class="dashboard-col-2">
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">ADMIN</div>
        
        </div>
        <router-link to="/admin"><img src="../../../assets/images/back.svg" loading="lazy" alt="" class="image-4"></router-link>
      </div>
      <div class="app-card">
        <div class="w-form">
          <form  @submit.prevent="register">
            <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">First Name</label><input v-model="user.first_name" type="text" class="auth-input w-input"  placeholder="Enter your firstname" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Last Name</label><input v-model="user.last_name" type="text" class="auth-input w-input" placeholder="Enter your last name" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Email Address</label><input v-model="user.email_address" type="email" class="auth-input w-input" placeholder="Enter your firstname" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Phone Number</label><input v-model="user.phone_number" type="tel" class="auth-input w-input" placeholder="Enter your last name" ></div>
             <div class="auth-form-col half-col"><label class="auth-form-label black">New Password</label><input required v-model="user.password" type="password" class="auth-input w-input"  placeholder="Enter your password" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Confirm Password</label><input required v-model="user.confirm_password" type="password" class="auth-input w-input" placeholder="Confirm your password" ></div>
            </div>
         <button type="submit" class="app-btn primary margin-top">Add User</button>

          </form>
        </div>
        
      </div>
    
  </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import Loader from "../../../components/UI/loader.vue"
import axios from "axios"
import url from '../../../../url'
export default {
    components: {
   Loader,
      MobileTopbar,
      SideBar,

    },
        data(){
    return{
     user:{
        id: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email_address: '',
        password: '',
        confirm_password: '',    
      },
      loading:false
    }   
    },
       methods:{
    async register(){
         if(this.user.password === this.user.confirm_password) {
          
    const resData = {
            "first_name": this.user.first_name,
            "last_name": this.user.last_name,
            "email_address": this.user.email_address,
            "phone_number": this.user.phone_number,
            "password": this.user.password,
            "role": 0
     }
     try{
       this.loading = true
       await axios.post(`${url}/create-account`, resData)
      if (typeof window !== 'undefined') {
        const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity: `New Admin Created. Details :  First Name: ${this.user.first_name}, Last Name: ${this.user.last_name}, Email : ${this.user.email_address}, Phone Number: ${this.user.phone_number}`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
        this.loading = false

     this.$notify({
    text: "New Admin Created Successful!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })

            this.user.first_name = "";
            this.user.last_name = "";
            this.user.email_address = "";
            this.user.phone_number = "";
            this.user.password = "";
            this.user.confirm_password = "";
    
        
    }
     }
     catch(error){
      this.loading = false
      this.$notify({
    text: error.response.data.error,
    type: 'error',
    duration: 3000,
    speed: 1000,
  })
      this.error = error.response.data.error;
     }
         }
         else{
           this.$notify({
          text: "Password does not match Confirm Password",
          type: 'error',
          duration: 3000,
          speed: 1000,
        })
         }
 
   
   }
       }
}
</script>

