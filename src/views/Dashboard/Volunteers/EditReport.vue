<template>
    <div>
 <notifications/>
   <Loader v-show="loading"/>
   <MobileTopbar/>
  <div class="dashboard-row">

 <SideBar/>
    <div class="dashboard-col-2">
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Edit Report</div>
        
        </div>
         <router-link to="/uploads"><img src="../../../assets/images/back.svg" loading="lazy" alt="" class="image-4"></router-link>
      </div>
      <div class="app-card">
       
        <div class="w-form">
          <form @submit.prevent="update">
            <div class="auth-form-row dashboard">
              <div class="auth-form-col half-col"><label class="auth-form-label black">Action Plan Year</label>
              <select v-model="user.year" class="app-select w-select">
                <option v-for="item in yearArray" :key="item.year" :value="item.year">{{item.year}}</option>
              </select>
              </div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">LGEA</label>
              <select v-model="user.lgea" class="app-select w-select">
                <option v-for="item in lgeaArray" :key="item.code" :value="item.code">{{item.title}}</option>
              </select>
              </div>
              <div class="auth-form-col half-col"><label class="auth-form-label black">School Name</label>
              <input v-model="user.school_name" type="text" class="auth-input w-input" placeholder="Type here" >
              </div>
               <div class="auth-form-col half-col"><label class="auth-form-label black">School Category</label>
              <select v-model="user.school_category" class="app-select w-select">
                <option v-for="item in categoryArray" :key="item.title" :value="item.title">{{item.title}}</option>
              </select>
              </div>
             <div class="auth-form-col half-col"><label class="auth-form-label black">Project</label>
               <select @change="getExpectedValue"  v-model="user.project" class="app-select w-select">
                <option :disabled="item.code == 1 ? false : item.code == 2 ? false : true" v-for="item in projectArray" :key="item.code" :value="item.code">{{item.title}}</option>
              </select>
             </div>
               <div class="auth-form-col half-col"><label class="auth-form-label black">Stage of Completion</label>
              <select v-model="user.stages" class="app-select w-select">
                <option v-for="item in stagesArray" :key="item.code" :value="item.code">{{item.title}}</option>
              </select>
              </div>
            </div>
            <div style="cursor: pointer;" class="div-block-18">
         <p> (Optional) Click to upload (Max. 100kb | Format. Jpg,Png)</p>  
          <br>
          <input name="images" @click="clearStore" type= "file" ref="fileInput" accept="image/*" @change="pickedFile" multiple></div>
          <br>
          <p>Picked Images</p>  
            <div style="cursor: pointer;flex-direction:row" class="div-block-18">
               <br>
          <img
          v-for="item in previewSource"
          :key="item"
                    :src="item"
                    alt="chosen"
                    style="height:150px; margin-right:10px"
                />
                <br>
            </div>
         
         <button type="submit" class="app-btn primary margin-top">Submit</button>

          </form>
        </div>
        
      </div>
    
  </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import Loader from "../../../components/UI/loader.vue"
import axios from "axios"
import url from '../../../../url'
import { stagesList, schoolCategoryList, ProjectsList, LGEASList} from  '../../../../commons'
export default {
    components: {
   Loader,
      MobileTopbar,
      SideBar,

    },
        data(){
    return{
      stagesArray:[],
      categoryArray: [],
      yearArray: [],
      projectArray: [],
      lgeaArray: [],
   previewSource:[],
     user:{
        id: '',
        lgea: '',
        stages: '',
        school_category: '',
        school_name: '',
        project: '',
        year: null,
        volunteer_id: '',    
        old_images: [],
        new_images: [],
        expected:0
      },
      loading:false
    }   
    },
    created(){
      this.stagesArray = stagesList
     this.projectArray = ProjectsList;
     this.lgeaArray = LGEASList; 
     this.categoryArray = schoolCategoryList;
     this.getReport()
     this.getAllocation()
    },

       methods:{

          async getExpectedValue(){
             this.loading = true
const token = localStorage.getItem('pk');
  const response = await axios.get(`${url}/get-lgea-projectdata?year=${this.user.year}&project=${this.user.project}&location=${this.user.lgea}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
      if(response.data.length <= 0) {
      this.loading = false
           return  this.$notify({
                        text: "No Action Plan Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
  this.loading = false
    this.user.expected = response.data[0].no_of_projects
         },
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
    this.user.year = response.data[0].year
   
   },
              getReport(){
       const result = JSON.parse(localStorage.getItem('edit'));
        this.user.id = result._id 
       this.user.lgea = result.lgea.code 
       this.user.project = result.project.code 
       this.user.year = result.year
       this.user.stages = result.stages
       this.user.school_name = result.school_name
        this.user.school_category = result.school_category
        this.user.old_images = result.images
        this.user.expected = result.expected
     },
     

         clearStore(){
        this.previewSource = []
        this.user.images = []
         },

           pickedFile(e){
           const sizes = []

           for(let i = 0; i < e.target.files.length; i++){
               if (typeof (e.target.files) != "undefined") {
            var size = parseFloat(e.target.files[i].size / 1024).toFixed(2);
            sizes.push(size);
        } else {
            alert("This browser does not support HTML5.");
        }
             }

           let validateSize = sizes.some(x => {
             return x > 100;
           })
          
          if(validateSize){
             return    this.$notify({
                  text: "Some files uploaded exceeds 100kb rule",
                  type: 'error',
                  duration: 3000,
                  speed: 1000,
                })
          }

             for(let i = 0; i < e.target.files.length; i++){
               const file = e.target.files[i];
                this.previewFile(file);
             }
    
           },

       previewFile(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
           this.previewSource.push(reader.result);
           this.user.new_images.push(reader.result);
        };
    },



    
    async update(){
          var formData = new FormData();
 const token = localStorage.getItem('pk');
 const userId = JSON.parse(localStorage.getItem('user'))._id;
    // const resData = {
    //         "_id": this.user.id,
    //         "lgea": this.user.lgea,
    //         "expected": parseInt(this.user.expected),
    //         "completed": parseInt(this.user.completed),
    //         "project": this.user.project,
    //         "year": this.user.year,
    //         "volunteer_id": userId,
    //         "new_images": this.user.new_images,
    //          "old_images": this.user.old_images
    //  }


     formData.append("_id", this.user.id);
     formData.append("lgea", this.user.lgea);
     formData.append("school_name", this.user.school_name);
     formData.append("school_category", this.user.school_category);
     formData.append("project", this.user.project);
     formData.append("year", this.user.year);
     formData.append("volunteer_id", userId);
     formData.append("stages", parseInt(this.user.stages))
     formData.append("expected", parseInt(this.user.expected))
     formData.append("old_images", this.user.old_images)

     for (let index = 0; index < this.$refs.fileInput.files.length; index++) {
        formData.append('images', this.$refs.fileInput.files[index]);
     }
     try{
       this.loading = true
       await axios.patch(`${url}/update-report`, formData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (typeof window !== 'undefined') {
      const newData = {  "_id": "62517e4a10c70a1fb07d2a20", "publish": false }
     await axios.patch(`${url}/update-publish`, newData,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity:  `Monitoring Report Updated`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
        this.loading = false

     this.$notify({
    text: "Report Updated Successfully!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })
      this.$router.push('/uploads')
          
    
        
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
         

 
   
   }
       }
}
</script>

