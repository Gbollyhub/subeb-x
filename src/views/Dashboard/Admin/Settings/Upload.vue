<template>
    <div>
        <div class="loader-class" style="display:none " id="bulk-loader">
            <fulfilling-bouncing-circle-spinner
                :animation-duration="4000"
                :size="60"
                color="#0093DD"
                />
        </div>
                <div class="loader-class" style="display:none;" id="bulk-success">
            <img src="../../../../assets/images/success.svg" loading="lazy" width="80" alt="" >
            <br>
            <h4>Upload Successful</h4>
            <br><br>
             <button style="cursor:pointer" @click="close" class="app-btn primary margin-top">Close</button>
        </div>
                <div class="loader-class" style="display:none " id="bulk-failed">
             <img src="../../../../assets/images/danger.svg" loading="lazy" width="80" alt="" >
               <br>
            <h4>Upload Failed</h4>
            <br><br>
                <button style="cursor:pointer"  @click="close" class="app-btn primary margin-top">Close</button>
        </div>
       <notifications/>
   <Loader v-show="loading"/>
   <div style="display:flex;margin-bottom:2rem">
<a download href="https://res.cloudinary.com/dja6wv2sl/raw/upload/v1649039260/ACTIONPLAN-TEMPLATE_2019_cpz6uh.xlsx" style="cursor:pointer;margin-right:20px;font-size:13px;text-decoration:underline"  class="link">Download Action Plan Template</a>
<a download href="https://res.cloudinary.com/dja6wv2sl/raw/upload/v1650003829/REPORT-LEGEND_cin0mh.xlsx" style="cursor:pointer;margin-right:20px;font-size:13px;text-decoration:underline" class="link">Download Legend</a>
   </div>
   
        <div>
          <form @submit.prevent="convert">
            <div class="auth-form-col half-col"><label for="name-5" class="auth-form-label black">Select Year {{year}}</label>
           <select v-model="year" class="app-select w-select" id="yearId" required>
                <option v-for="item in yearArray" :key="item.code" :value="item.code">{{item.code}}</option>
              </select>
            </div>
   
        <div style="cursor: pointer;" class="div-block-18">
         <p>Click to upload (Format. CSV/Excel)</p>  
          <br>
          
          <input type= "file" ref="myfiles" id="myfile" name="myfile" accept=".xls, .xlsx" required></div>
         <br><br>
        <button style="cursor:pointer" type="submit" class="app-btn primary margin-top">Upload</button>
         
         </form>
      </div>
        </div>
</template>

<script>
import { YearList} from  '../../../../../commons'
import * as XLSX from 'xlsx';
import axios from "axios"
import url from '../../../../../url'
import Loader from "../../../../components/UI/loader.vue"
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

export default {
    components:{
   "fulfilling-bouncing-circle-spinner" : FulfillingBouncingCircleSpinner,
    Loader,
  },
    data(){
      return {
        year: "",
        yearArray: [],
        loading:false
      }
    },
        created(){
     this.yearArray = YearList;    
    },


    methods:{

     close(){
           location.reload()
     },

     async convert(){
         
         var selectedFile = this.$refs.myfiles.files[0]

         var reader = new FileReader();

   reader.onload = async function(event) {
     document.getElementById("bulk-loader").style.display = "flex";
var data = event.target.result;  
    var workbook = XLSX.read(data, {
        type: "array"
    });
    var e = document.getElementById("yearId");
     var year_value = e.value;
     console.log(year_value)
     for (let i = 0; i < workbook.SheetNames.length; i++) {

     var first_sheet_name = workbook.SheetNames[i];
  
    var worksheet = workbook.Sheets[first_sheet_name];

    var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
   const id = JSON.parse(localStorage.getItem('user'))._id


      try{
   if(i  == 0){
     const newData = _JsonData.map( x => {
                         return{      
                                  "allocation": parseFloat(x.allocation),
                                  "year": parseInt(year_value),
                                  "user_id": id
                         }
                       })

     
           const token = localStorage.getItem('pk');    
       await axios.post(`${url}/register-allocation`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })

   }
   else if(i  == 1){
     const newData = _JsonData.map( x => {
                         return{      
                                  "component": x.component.toString(),
                                  "area_of_intervention": x.area_of_intervention.toString(),
                                  "no_of_projects": parseInt(x.no_of_projects),
                                  "expected_outcome": x.expected_outcome.toString(),
                                  "actual_amount": parseFloat(x.actual_amount),
                                  "percentage": parseInt(x.percentage),
                                  "year": parseInt(year_value),
                                  "user_id": id
                         }
                       })

           const token = localStorage.getItem('pk');    
       await axios.post(`${url}/register-breakdown`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      console.log("Breakdown Added")

   }
   else{
     const newData = _JsonData.map( x => {
                         return{      
                                  "activities": x.activities.toString(),
                                  "objectives": x.objectives.toString(),
                                  "strategy": x.implementation_strategy.toString(),
                                  "target_groups": x.target_groups.toString(),
                                  "location": parseInt(x.lgea_code),
                                  "output": parseInt(x.output),
                                  "duration": x.duration.toString(),
                                  "expected_outcome": x.expected_outcome.toString(),
                                  "indicator": x.achievement_indicator.toString(),
                                  "unit_cost": parseFloat(x.unit_cost),
                                  "total_cost": parseFloat(x.total_cost),
                                  "project": parseInt(x.project_code),
                                  "no_of_projects": parseInt(x.no_of_project),
                                  "year": parseInt(year_value),
                                  "user_id": id,
                               
                         }
                       })
    
           const token = localStorage.getItem('pk');    
       await axios.post(`${url}/register-projectdata`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      console.log("Project Added")
   
   }

  }
     catch(error){
       document.getElementById("bulk-loader").style.display = "none";
     document.getElementById("bulk-failed").style.display = "flex";
     }
     }

    const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity:  `New Action Plan Uploaded. Details: Year: ${year_value}`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
document.getElementById("bulk-loader").style.display = "none";
document.getElementById("bulk-success").style.display = "flex";
   
   }
   await reader.readAsArrayBuffer(selectedFile);
    this.loading = false
        

      }
      
    }

}
</script>

<style scoped>
.loader-class{
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.886);
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999999;
}

.loader-img {
 width: 150px;
}
</style>
