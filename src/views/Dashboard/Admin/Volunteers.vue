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
          <div class="text-block-3">Volunteers</div>
         
        </div>
        
      </div>
      <div class="app-card">
        <div class="app-space-between">
          <div class="form-block-2">
    <input v-model="searchQuery" type="text" class="app-card-select w-input" placeholder="Search by firstname">
          </div>

        </div>
       <br><br>
       <div class="table-div"  v-if="!resultQuery.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">FIRST NAME</div></th>
    <th><div class="table-header">LAST NAME</div></th>
    <th><div class="table-header">PHONE NUMBER</div></th>
    <th><div class="table-header">EMAIL ADDRESS</div></th>
     <th><div class="table-header">STATUS</div></th>
     <th><div class="table-header">.</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(user, index) in resultQuery" :key="index" >
    <td><div class="table-data">{{index + 1}}</div></td>
    <td><div class="table-data">{{user.createdAt | moment }}</div></td>
    <td><div class="table-data">{{user.first_name}}</div></td>
    <td><div class="table-data">{{user.last_name}}</div></td>
    <td><div class="table-data">{{user.phone_number}}</div></td>
    <td><div class="table-data">{{user.email_address}}</div></td>
    <td><div class="table-data">{{user.isActive ? "Active" : "Inactive"}}</div></td>
    <td><div class="table-data">
      <div v-if="user.isActive" @click="changeStatus(0, user,index)" style="cursor:pointer;padding:10px" class="app-btn danger">Deactivate</div>
      <div v-else @click="changeStatus(1, user, index)" style="cursor:pointer;padding:10px" class="app-btn primary">Activate</div>
      </div></td>
  </tr>
            </tbody>
</table>
       </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import axios from "axios"
import url from '../../../../url'
import Loader from "../../../components/UI/loader.vue"
import moment from 'moment'
export default {
    filters:{
   moment: function(date){
       return moment(date).format('MMMM Do YYYY, h:mm:ss a');
   }
  },
    components: {
   Loader,
      MobileTopbar,
      SideBar
    },
        data(){
    return{
       searchQuery: '',
      activeTabClass: 'active-tab',
    admins:[],
    loading:false
    }   
    },
        computed:{
 
          resultQuery(){
      if(this.searchQuery){
      return this.admins.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.first_name.toLowerCase().includes(v))
      })
      }else{
        return this.admins;
      }
    },
  },
    created(){
        this.getUsers();
    },
       methods:{
         async changeStatus(status, user, index){
           const token = localStorage.getItem('pk');
         
    const resData = {
               "_id": user._id,
            "isActive": user.isActive ? false : true
     }
     try{
       this.loading = true
       await axios.patch(`${url}/update-account`, resData, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (typeof window !== 'undefined') {
          const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity: status == 0 ? `Volunteer with Details : ID ${ this.user._id}, EMAIL:${this.user.email_address} Deactivated` : `Volunteer with Details : ID ${ this.user._id}, EMAIL:${this.user.email_address} Activated`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
        this.loading = false
   this.admins[index].isActive = user.isActive ? false : true
  
     this.$notify({
    text: "Update Successful!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })
     
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
         },
   async getUsers() {
         
      const token = localStorage.getItem('pk');
      const response = await axios.get(`${url}/get-users`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
      if(response.data.length <= 0) {
       
           return      this.$notify({
                        text: "No Volunteers Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
      const filterArray = response.data
      const sortArray = filterArray.filter( x => {
          return x.role == 1;
      })
      const newArray = sortArray.sort(function(a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d-c;
    });
    this.admins = newArray;
     
   }
       }
}
</script>

