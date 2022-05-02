<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row"> 
       <SideBar/>
    <div class="dashboard-col-2">
       <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Area of Intervention</div>
         
        </div>
        <div>
          
        </div>
      </div>
      <div class="projects-row">
        <div class="app-card" v-for="(item, index) in projectArray" :key="index">
          <div class="div-block-17">
            <div class="project-heading">
              <div class="text-block-15">{{item.title}}</div>
              <router-link  :to="{
           name: 'Project',
           params: {id: item.code}
            }" class="link">Proceed</router-link>
            </div>
            <div class="text-block-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et doloremagna aliqua.</div>
          </div><img src="../../../assets/images/spiral.svg" loading="lazy" alt="" class="image-3">
        </div>
      </div>
  </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"

import {  ProjectsList} from  '../../../../commons'


export default {
    components: {
      MobileTopbar,
      SideBar,

    },
    data(){
    return{
      activeTabClass: 'active-tab',
      actionplan: true,
      report: false,
            yearArray: [],
      projectArray: [],
      lgeaArray: [],
      year: 2019,
      allocation: {}
    }
    },
        created(){
    
     this.projectArray = ProjectsList;

    },
    methods:{
  

    }
}
</script>

