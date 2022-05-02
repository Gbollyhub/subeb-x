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