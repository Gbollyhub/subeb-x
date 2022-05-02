<template>
    <div>
         <notifications/>
        <div class="noChanges" v-if="reports.publish">
         No changes on the system at this moment
       </div>
       <div v-else>
<div  class="someChanges">
         There seem to be some changes on the system
       </div>
        <br><br>
        <div @click="publish" style="cursor:pointer" class="app-btn primary margin-top">Publish Changes</div>
       </div>
       
    </div>
</template>

<script>

import axios from "axios"
import url from '../../../../../url'
export default {
 
        data(){
    return{
       searchQuery: '',
      activeTabClass: 'active-tab',
      reports:{}
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
           
async publish(){
     
try {
       const newData = {  "_id": "62517e4a10c70a1fb07d2a20", "publish": true }
       const token = localStorage.getItem('pk');    

     await axios.patch(`${url}/update-publish`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
     const user_id = JSON.parse(localStorage.getItem('user'))._id;
     const logData = {
           "activities": { activity:  `Changes Published`},
            "user_id": user_id,
        }
     await axios.post(`${url}/register-log`, logData)
    this.reports.publish = true;
     this.$notify({
    text: "Changes Published Successfully!",
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
 
   
      const response = await axios.get(`${url}/get-publish`)
      if(response.data.length <= 0) {
       
           return      this.$notify({
                        text: "No publish records found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
    this.reports =response.data[0];
     
   },

       }
}
</script>

<style scoped>
.noChanges{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: rgb(208, 255, 191);
  color: rgb(6, 171, 20);
  border-radius: 3px;
}
.someChanges{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: rgb(255, 226, 191);
  color: rgb(171, 105, 6);
  border-radius: 3px;
}
</style>



