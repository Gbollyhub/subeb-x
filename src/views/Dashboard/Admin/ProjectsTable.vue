<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
             <notifications/>
             <Loader v-show="loading"/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Projects</div>
          
        </div>
        <div class="form-block">
                    <select @change="getProject"  v-model="year"  class="app-select w-select">
                   <option v-for="item in yearArray" :key="item.year" :value="item.year">{{item.year}}</option>
                </select>            
          </div>

      </div>
      <div class="app-card">
  
       <div class="table-div" v-if="!report.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">ACTIVITIES</div></th>
    <th><div class="table-header">DURATION</div></th>
    <th><div class="table-header">TOTAL COST</div></th>
   <th><div class="table-header">.</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item, index) in report" :key="index"  >
    <td><div class="table-data">{{index + 1}}</div></td>
      <td><div class="table-data">{{item.createdAt | moment }}</div></td>
    <td><div class="table-data">{{item.activities}}</div></td>
    <td><div class="table-data">{{item.duration}}</div></td>
    <td><div class="table-data">N{{item.total_cost.toLocaleString()}}</div></td>
     <td><div class="table-data"><div style="cursor:pointer" @click="toDetails(item)" class="link">View Details</div></div></td>

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
      MobileTopbar,
      SideBar,
      Loader
    },
        data(){
    return{
            yearArray: [],
      searchQuery: '',
      activeTabClass: 'active-tab',
    admins:[],
    report:[],
    year: 2019,
    loading: false
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
   async created(){
     
     
      await  this.getAllocation()
        this.getProject();
    },
       methods:{

               async getAllocation() {
 
    const token = localStorage.getItem('pk');
   
      const response = await axios.get(`${url}/get-allocation`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
      if(response.data.length <= 0) {
      
           return      this.$notify({
                        text: "No Action Plan Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
    this.yearArray = response.data;
    this.year = response.data[0].year
   
   },

            toDetails(item){
     localStorage.setItem('p-details',JSON.stringify(item));
     this.$router.push('/project-details')
   },

   async getProject() {
         
     this.loading = true;
        const token = localStorage.getItem('pk');
         const response = await axios.get(`${url}/get-projectdata?year=${this.year}&project=${this.$route.params.id}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
         
         if(response.data.length <= 0) {
           this.report = []
            this.loading = false;
           return this.$notify({
                        text: "No Project Found",
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


       this.loading = false;
        this.report = result; 
     
   }
       }
}
</script>

