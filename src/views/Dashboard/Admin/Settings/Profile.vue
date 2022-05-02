<template>
    <div>
     <notifications/>
   <Loader v-show="loading"/>
          <form>
            <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">First Name</label><input v-model="user.first_name" type="text" class="auth-input w-input"  placeholder="Enter your firstname" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Last Name</label><input v-model="user.last_name" type="text" class="auth-input w-input" placeholder="Enter your last name" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Email Address</label><input v-model="user.email_address" type="email" class="auth-input w-input" placeholder="Enter your firstname" readonly></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Phone Number</label><input v-model="user.phone_number" type="tel" class="auth-input w-input" placeholder="Enter your last name" readonly></div>
            </div>
      
              </form>
            <form @submit.prevent="updatePassword"> 
              <br><br>
              <h5>Change Password</h5>
              <br><br>
              <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">New Password</label><input required v-model="user.password" type="password" class="auth-input w-input"  placeholder="Enter your password" ></div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">Confirm Password</label><input required v-model="user.confirm_password" type="password" class="auth-input w-input" placeholder="Confirm your password" ></div>
              </div>
          <button type = "submit" class="app-btn primary margin-top">Change Password</button>
          </form>
        </div>

</template>

<script>
import axios from "axios"
import url from '../../../../../url'
import Loader from "../../../../components/UI/loader.vue"
export default {
    components: {
   Loader
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
        role: 0,    
      },
      loading:false
      }
    },
    created(){
      this.getUser()
    },
    methods:{
     getUser(){
       const result = JSON.parse(localStorage.getItem('user'));
       this.user.id = result._id
       this.user.first_name = result.first_name
       this.user.last_name = result.last_name
       this.user.phone_number = result.phone_number
       this.user.email_address = result.email_address
        this.user.role = result.role
     },
    async updatePassword(){
      
          if(this.user.password === this.user.confirm_password) {
           const token = localStorage.getItem('pk');
    const resData = {
            "_id": this.user.id,
            "first_name": this.user.first_name,
            "last_name": this.user.last_name,
            "email_address": this.user.email_address,
            "phone_number": this.user.phone_number,
            "password": this.user.password,
            "role": this.user.role
     }
     try{
       this.loading = true
       await axios.patch(`${url}/update-account`, resData, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (typeof window !== 'undefined') {

        this.loading = false

     this.$notify({
    text: "Update Successful!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })


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

