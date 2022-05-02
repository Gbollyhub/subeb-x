<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
           <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Uploads</div>
          
        </div>
       
      </div>
      <div class="app-card">
        <div class="app-space-between">
          <div class="form-block-2">
    <input v-model="searchQuery" type="text" class="app-card-select w-input" placeholder="Search by Year">
          </div>
         
        </div>
       <br><br>
       <div class="table-div"  v-if="!resultQuery.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">DATE</div></th>
    <th><div class="table-header">YEAR</div></th>
    <th><div class="table-header">LGEA</div></th>
    <th><div class="table-header">PROJECT</div></th>
    <th><div class="table-header">SCHOOL</div></th>
    <th><div class="table-header">CATEGORY</div></th>
    <th><div class="table-header">IMAGES</div></th>
    <th><div class="table-header">.</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item, index) in resultQuery" :key="index" >
    <td><div class="table-data">{{index + 1}}</div></td>
     <td><div class="table-data">{{item.createdAt | moment }}</div></td>
    <td><div class="table-data">{{item.year}}</div></td>
    <td><div class="table-data">{{item.lgea.title}}</div></td>
    <td><div class="table-data">{{item.project.title}}</div></td>
    <td><div class="table-data">{{item.school_name}}</div></td>
    <td><div class="table-data">{{item.school_category}}</div></td>
     <td><div class="table-data">{{item.images.length}}</div></td>
      <td><div class="table-data"><div style="cursor:pointer" @click="toEditProject(item)" class="link">Edit Project</div></div></td>
      <td><div class="table-data">
      <div @click="deleteReport(item, index)" style="cursor:pointer;padding:10px" class="app-btn danger">Delete</div>
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
import { ProjectsList, LGEASList} from  '../../../../commons'
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
        return this.searchQuery.toLowerCase().split(' ').every(v => item.year.toLowerCase().includes(v))
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

         async deleteReport(item, index){
try {
   const token = localStorage.getItem('pk');
     await axios.delete(`${url}/remove-report?id=${item._id}`,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
 const user_id = JSON.parse(localStorage.getItem('user'))._id;
 const newData = {  "_id": "62517e4a10c70a1fb07d2a20", "publish": false }
     await axios.patch(`${url}/update-publish`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      const logData = {
           "activities": { activity:  `Monitoring Report Deleted`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
     this.reports.splice(index,1)
     this.$notify({
    text: "Report Deleted Successfully!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })
    
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
    const id = JSON.parse(localStorage.getItem('user'))._id;
      const response = await axios.get(`${url}/get-user-reports?userId=${id}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
               if(response.data.length <= 0) {
       
           return      this.$notify({
                        text: "No Uploads Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
      const result1 = await response.data.map(x => { 
         return {
           ...x,
            lgea : { "title": LGEASList.find((entry)=>{return x.lgea === entry.code}).title, "code": x.lgea},
            project : {  "title":ProjectsList.find((entry)=>{return x.project === entry.code}).title, "code": x.project }
  
         }
        })

              const result2 = result1.sort(function(a, b) {
                var c = new Date(a.createdAt);
                var d = new Date(b.createdAt);
                return d-c;
            });

    
    this.reports =result2;
     
   },
   toEditProject(item){
     localStorage.setItem('edit',JSON.stringify(item));
     this.$router.push('/edit-report')
   }
       }
}
</script>

