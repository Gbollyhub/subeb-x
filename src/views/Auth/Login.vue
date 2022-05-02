<template> 
 <div class="auth-bg">
   <notifications/>
   <Loader v-show="loading"/>
     <div class="auth-bg-cover">
     <Logo/>
      <div class="auth-div">
        <AuthHeader title="Login into your Account" sub="Fill in your valid credentials to continue"/>
        <div>
          <form @submit.prevent="login">
            <div class="auth-form-col"><label for="name" class="auth-form-label">Username</label><input v-model="user.email_address" type="text" class="auth-input w-input"  placeholder="Enter your username" required></div>
            <div class="auth-form-col"><label for="name-2" class="auth-form-label">Password</label><input v-model="user.password" type="password" class="auth-input w-input"  placeholder="Enter your password" required></div>
         
                 <router-link to="/" class="auth-forgot-password">Forgot Password</router-link>
        <br>
        <button type="submit" class="auth-btn">LOGIN</button>
          </form>
        
        </div>

        <div class="auth-footer"><img src="../../assets/images/info.svg" loading="lazy" alt="" class="info-icon">
          <div class="text-block">
        Experiencing any problem with loging into your account ? Kindly contact the super admin to help resolve your issues.
          </div>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
import axios from "axios"
import url from '../../../url'
import Loader from "../../components/UI/loader.vue"
import AuthHeader from "../../components/Auth/AuthHeader.vue"
import Logo from "../../components/Global/Logo.vue"
export default {
  components: {
   Loader,
   AuthHeader,
   Logo
  },
    data(){
    return{
      loading: false,
      user:{
        email_address: 'test@test.com',
        password: 'test@100'
      }
    }
},
    methods:{
       async login(){
     const resData = {
       "email_address": this.user.email_address,
       "password": this.user.password
     }
     try{
       this.loading = true
      const user = await axios.post(`${url}/login`, resData)
      if (typeof window !== 'undefined') {

        localStorage.setItem('pk', user.data.token);
        localStorage.setItem('user', JSON.stringify(user.data.user));
         localStorage.setItem('role', user.data.user.role); 
        const logData = {
           "activities": { activity: "User logs into the system"},
            "user_id": user.data.user._id,
        }
        await axios.post(`${url}/register-log`, logData)
        this.loading = false
        if(user.data.user.role == 0 || user.data.user.role == 2){
         return this.$router.push({path:'/overview'});
        }
        this.$router.push({path:'/report-form'});
        
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
    }
}
</script>

