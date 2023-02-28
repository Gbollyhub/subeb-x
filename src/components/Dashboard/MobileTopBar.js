import axios from "axios"
import url from '../../../url'
import Logo from "../Global/Logo"
export default {
  components: {
    Logo
  },
  data() {
    return {
      role: JSON.parse(localStorage.getItem('role')),
      isMobileMenu: false
    }
  },
  methods: {

    async Logout() {
      const token = localStorage.getItem('pk');
      const user_id = JSON.parse(localStorage.getItem('user'))._id;
      //      const resData = {
      //         "token": localStorage.getItem('pk')
      //  }
      try {

        await axios.get(`${url}/logout`, { headers: { 'Authorization': `Bearer ${token}` } })
        if (typeof window !== 'undefined') {

          localStorage.removeItem('pk');
          localStorage.removeItem('user');
          localStorage.removeItem('role');

          const logData = {
            "activities": { activity: `User Logged Out` },
            "user_id": user_id,
          }
          await axios.post(`${url}/register-log`, logData)
          this.$router.push({ path: '/' })

        }
      }
      catch (error) {

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