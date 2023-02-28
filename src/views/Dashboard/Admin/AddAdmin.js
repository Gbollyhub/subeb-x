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
  data() {
    return {
      user: {
        id: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email_address: '',
        password: '',
        confirm_password: '',
      },
      loading: false
    }
  },
  methods: {
    async register() {
      if (this.user.password === this.user.confirm_password) {

        const resData = {
          "first_name": this.user.first_name,
          "last_name": this.user.last_name,
          "email_address": this.user.email_address,
          "phone_number": this.user.phone_number,
          "password": this.user.password,
          "role": 0
        }
        try {
          this.loading = true
          await axios.post(`${url}/create-account`, resData)
          if (typeof window !== 'undefined') {
            const user_id = JSON.parse(localStorage.getItem('user'))._id;
            const logData = {
              "activities": { activity: `New Admin Created. Details :  First Name: ${this.user.first_name}, Last Name: ${this.user.last_name}, Email : ${this.user.email_address}, Phone Number: ${this.user.phone_number}` },
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
        catch (error) {
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
      else {
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