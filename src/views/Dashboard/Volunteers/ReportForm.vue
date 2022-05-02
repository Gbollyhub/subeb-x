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
          <div class="text-block-3">Project Monitoring Tool</div>
          
        </div>
       
      </div>
      <div class="app-card">
       
        <div class="w-form">
          <form @submit.prevent="register">
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
              <input v-model="user.schoolName" type="text" class="auth-input w-input" placeholder="Type here" >
              </div>
               <div class="auth-form-col half-col"><label class="auth-form-label black">School Category</label>
              <select v-model="user.schoolCategory" class="app-select w-select">
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

<script src="./ReportForm.js"></script>

