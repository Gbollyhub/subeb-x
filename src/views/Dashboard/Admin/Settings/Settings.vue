<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">

 <SideBar/>
    <div class="dashboard-col-2">
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Settings</div>
         
        </div>
        <div><img src="images/back.svg" loading="lazy" alt="" class="image-4"></div>
      </div>
      <div class="app-card">
        <div class="content-tab">
          <div class="tab-title" :class="[ profile ? activeTabClass : '']" @click="openProfile">UPDATE PROFILE</div>
          <div v-show="role == 0 || role == 2" class="tab-title" :class="[ upload ? activeTabClass : '']" @click="openUpload">ACTION PLAN DATA UPLOAD</div>
          <div v-show="role == 0 || role == 2" class="tab-title" :class="[ upload_table ? activeTabClass : '']" @click="openUploadTable">ACTION PLAN DATA HISTORY</div>
          <div v-show="role == 0 || role == 2" class="tab-title" :class="[ report ? activeTabClass : '']" @click="openReport">MONITORING REPORT DATA UPLOAD</div>
           <div v-show="role == 2" class="tab-title" :class="[ publish ? activeTabClass : '']" @click="openPublish">PUBLISH</div>
        </div>
      <Profile v-show="profile"/>
      <Upload v-show="upload"/>
      <UploadTable v-show="upload_table"/>
        <Report v-show="report"/>
      <Publish v-show="publish"/>
      
    </div>
    
  </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../../components/Dashboard/SideBar.vue"
import Profile from "./Profile.vue"
import Upload from "./Upload.vue"
import UploadTable from "./UploadTable.vue"
import Publish from "./Publish.vue"
import Report from "./ReportUpload.vue"

export default {
    components: {
      MobileTopbar,
      SideBar,
      Profile,
      Upload,
      UploadTable,
      Publish,
      Report
    },
        data(){
    return{
       role: JSON.parse(localStorage.getItem('role')),
      activeTabClass: 'active-tab',
      profile: true,
      upload: false,
      upload_table: false,
      publish: false,
      report: false
    }   
    },
       methods:{

     openProfile(){
     this.profile = true;
     this.upload = false;
     this.upload_table = false;
     this.publish = false;
     this.report = false;
      },

     openUpload(){
     this.profile = false;
     this.upload = true;
     this.upload_table = false;
     this.publish = false;
     this.report = false;
      },

     openUploadTable(){
     this.profile = false;
     this.upload = false;
     this.upload_table = true;
     this.publish = false;
     this.report = false;
      },

     openPublish(){
     this.profile = false;
     this.upload = false;
     this.upload_table = false;
     this.publish = true;
     this.report = false;
      }, 

     openReport(){
     this.profile = false;
     this.upload = false;
     this.upload_table = false;
     this.publish = false;
     this.report = true;    
      },

       }
}
</script>

