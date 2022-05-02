<template>
    <div>
        <div class="menu-modal" v-show="isMobileMenu">
    <router-link to="#" class="close-btn ">
      <div  @click="isMobileMenu = false">CLOSE-MENU</div>
    </router-link>

    <div class="dashboard-nav-links-div">
          <router-link  active-class="active-nav" v-show="role == 0 || role == 2" to="/overview"  class="dashboard-nav-link"><img src="../../assets/images/bx_bxs-dashboard.svg" loading="lazy" alt="" class="nav-icon">
          <div>Dashboard</div>
        </router-link>
         <router-link  active-class="active-nav" v-show="role == 1 || role == 2" to="/report-form" class="dashboard-nav-link"><img src="../../assets/images/form-icon.svg" loading="lazy" alt="" class="nav-icon">
          <div>Monitoring Tool</div>
        </router-link>
         <router-link  active-class="active-nav" v-show="role == 1 || role == 2" to="/uploads" class="dashboard-nav-link"><img src="../../assets/images/data-icon.svg" loading="lazy" alt="" class="nav-icon">
          <div>Uploads</div>
        </router-link>
        <router-link  active-class="active-nav" v-show="role == 0 || role == 2" to="/projects" class="dashboard-nav-link "><img src="../../assets/images/projects.svg" loading="lazy" alt="" class="nav-icon">
          <div>Projects</div>
        </router-link>
        <router-link  active-class="active-nav" v-show="role == 0 || role == 2" to="/comparison" class="dashboard-nav-link "><img src="../../assets/images/comparison.svg" loading="lazy" alt="" class="nav-icon">
          <div>Comparison</div>
        </router-link>
        <router-link  active-class="active-nav" v-show="role == 0 || role == 2" to="/volunteers" class="dashboard-nav-link "><img src="../../assets/images/volunteers.svg" loading="lazy" alt="" class="nav-icon">
          <div>Volunteers</div>
        </router-link>
        <router-link  active-class="active-nav" v-show="role == 0 || role == 2" to="/admin" class="dashboard-nav-link "><img src="../../assets/images/bx_bxs-user.svg" loading="lazy" alt="" class="nav-icon">
          <div>Admin</div>
        </router-link>
        <router-link  active-class="active-nav" to="/settings" class="dashboard-nav-link "><img src="../../assets/images/settings.svg" loading="lazy" alt="" class="nav-icon">
          <div>Settings</div>
        </router-link>
        <router-link   active-class="active-nav"  v-show="role == 0 || role == 2" to="/logs" class="dashboard-nav-link "><img src="../../assets/images/data-icon.svg" loading="lazy" alt="" class="nav-icon">
          <div>Logs</div>
        </router-link>
    </div>
    <div class="div-block">
        <div @click="Logout" style="cursor:pointer" class="dashboard-nav-link logout"><img src="../../assets/images/carbon_logout.svg" loading="lazy" alt="" class="nav-icon">
          <div>Logout</div>
        </div>
      </div>
  </div>
    <div class="app-nav mobile"><img src="../../assets/images/lasubeb_logo_only-1.png" loading="lazy" alt=""><img @click="isMobileMenu = true" src="../../assets/images/ant-design_menu-outlined-1.svg" loading="lazy" width="32" alt=""></div>
    </div>
</template>

<script>
import axios from "axios"
import url from '../../../url'
export default {
  data(){
  return{
      role: JSON.parse(localStorage.getItem('role')),
    isMobileMenu: false
  }
  },
    methods: {

   async Logout(){
         const token = localStorage.getItem('pk');
           const user_id = JSON.parse(localStorage.getItem('user'))._id;
    //      const resData = {
    //         "token": localStorage.getItem('pk')
    //  }
     try{
     
      await axios.get(`${url}/logout`,{ headers: { 'Authorization': `Bearer ${token}` } })
      if (typeof window !== 'undefined') {

        localStorage.removeItem('pk');
        localStorage.removeItem('user');
         localStorage.removeItem('role');
 
      const logData = {
           "activities": { activity:  `User Logged Out`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
        this.$router.push({path:'/'})
        
    }
     }
     catch(error){
  
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

