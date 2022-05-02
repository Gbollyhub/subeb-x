<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
           <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Logs</div>
         
        </div>
       
      </div>
      <div class="app-card">
        <div class="app-space-between">
          <div class="form-block-2">
    <input v-model="searchQuery" type="text" class="app-card-select w-input" placeholder="Search Date">
          </div>
           <div  @click="clearLogs()" style="cursor:pointer;padding:10px" class="app-btn danger">Clear Logs</div>
        </div>
       <br><br>
       <div class="table-div"  v-if="!resultQuery.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">ACTIVITY</div></th>
    <th><div class="table-header">USER</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item, index) in resultQuery" :key="index" >
    <td><div class="table-data">{{index + 1}}</div></td>
     <td><div class="table-data">{{item.createdAt | moment }}</div></td>
    <td><div class="table-data">{{item.activities.activity}}</div></td>
    <td><div class="table-data">{{item.user_id ? `${item.user_id.first_name} ${item.user_id.last_name}` : null}}</div></td>
   
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
import moment from 'moment'
export default {
    filters:{
   moment: function(date){
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
   }
  },
    components: {
      MobileTopbar,
      SideBar
    },
        data(){
    return{
       searchQuery: '',
      activeTabClass: 'active-tab',
    reports:[]
    }   
    },
        computed:{
 
          resultQuery(){
      if(this.searchQuery){
      return this.reports.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.createdAt.toLowerCase().includes(v))
      })
      }else{
        return this.reports;
      }
    },
  },
    created(){
        this.getReports();
    },
       methods:{

   async clearLogs() {
     const token = localStorage.getItem('pk');
try {
     await axios.delete(`${url}/clear-logs`,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
     const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity:  `Logs Cleared`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
 
     this.$notify({
    text: "Logs Cleared Successfully!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })

  this.reports = []
    
} catch (error) {
          this.$notify({
    text: error.response.data.error,
    type: 'error',
    duration: 3000,
    speed: 1000,
  })
}
   },
   async getReports() {
 
    const token = localStorage.getItem('pk');
  
      const response = await axios.get(`${url}/get-logs`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
               if(response.data.length <= 0) {
       
           return      this.$notify({
                        text: "No Logs Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }

                     const result = response.data.sort(function(a, b) {
                var c = new Date(a.createdAt);
                var d = new Date(b.createdAt);
                return d-c;
            });

    this.reports = result;
     
   },

       }
}
</script>

