<template>
    <div>
        <div class="loader-class" style="display:none " id="bulk-loader2">
            <fulfilling-bouncing-circle-spinner
                :animation-duration="4000"
                :size="60"
                color="#0093DD"
                />
        </div>
                <div class="loader-class" style="display:none;" id="bulk-success2">
            <img src="../../../../assets/images/success.svg" loading="lazy" width="80" alt="" >
            <br>
            <h4>Upload Successful</h4>
            <br><br>
             <button style="cursor:pointer" @click="close" class="app-btn primary margin-top">Close</button>
        </div>
                <div class="loader-class" style="display:none " id="bulk-failed2">
             <img src="../../../../assets/images/danger.svg" loading="lazy" width="80" alt="" >
               <br>
            <h4>Upload Failed</h4>
            <br><br>
                <button style="cursor:pointer"  @click="close" class="app-btn primary margin-top">Close</button>
        </div>
       <notifications/>
   <Loader v-show="loading"/>
   <div style="display:flex;margin-bottom:2rem">
  <a download href="https://res.cloudinary.com/dja6wv2sl/raw/upload/v1650003829/MONITORING_REPORT-TEMPLATE_2019_fnuxfo.xlsx" style="cursor:pointer;margin-right:20px;font-size:13px;text-decoration:underline"  class="link">Download Report Template</a>
  <a download href="https://res.cloudinary.com/dja6wv2sl/raw/upload/v1650003829/REPORT-LEGEND_cin0mh.xlsx" style="cursor:pointer;margin-right:20px;font-size:13px;text-decoration:underline" class="link">Download Legend</a>
   </div>
   
      <div>
          <form @submit.prevent="convert">

        <div class="auth-form-col half-col"><label for="name-5" class="auth-form-label black">Select Year {{year}}</label>
              <select v-model="year" class="app-select w-select" id="yearId2" required>
                <option v-for="item in yearArray" :key="item.code" :value="item.code">{{item.code}}</option>
              </select>
        </div>
   
        <div style="cursor: pointer;" class="div-block-18">
           
        <p>Click to upload (Format. CSV/Excel)</p>  

        <br>
          
        <input type= "file" ref="myfiles" id="myfile" name="myfile" accept=".xls, .xlsx" required> </div>

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
     document.getElementById("bulk-loader2").style.display = "flex";
    var data = event.target.result;  
    var workbook = XLSX.read(data, {
        type: "array"
    });
    var e = document.getElementById("yearId2");
     var year_value = e.value;
     console.log(year_value)
     for (let i = 0; i < workbook.SheetNames.length; i++) {

     var first_sheet_name = workbook.SheetNames[i];
  
    var worksheet = workbook.Sheets[first_sheet_name];

    var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    const id = JSON.parse(localStorage.getItem('user'))._id


      try{
  
     const newData = _JsonData.map( x => {
                         return {      
                                  "lgea": parseInt(x.lgea_code),
                                  "expected": parseInt(x.expected),
                                  "school_name": x.school_name,
                                  "school_category": x.school_category,
                                  "stages": parseInt(x.stages_code),
                                  "project": parseInt(x.project_code),
                                  "year": parseInt(year_value),
                                  "volunteer_id": id,
                                  "images": []
                         }
                       })
 
       const token = localStorage.getItem('pk');    
       await axios.post(`${url}/register-many-report`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })

  }
     catch(error){
       document.getElementById("bulk-loader2").style.display = "none";
     document.getElementById("bulk-failed2").style.display = "flex";
     }
     }
     document.getElementById("bulk-loader2").style.display = "none";
document.getElementById("bulk-success2").style.display = "flex";
       const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity:  `New Monitoring Report Uploaded. Details: Year: ${year_value}`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
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
