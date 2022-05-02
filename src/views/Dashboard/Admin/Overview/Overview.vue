<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row"> 
       <SideBar/>
    <div class="dashboard-col-2">
       <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Dashboard</div>
         
        </div>
        <div>
          <div class="form-block">
                        <select v-model="year"  class="app-select w-select">
                   <option v-for="item in yearArray" :key="item.year" :value="item.year">{{item.year}}</option>
                </select>
          </div>
        </div>
      </div>
      <div class="content-info-box"><img src="../../../../assets/images/Plant.svg" loading="lazy" width="28" alt="" class="image">
        <div class="div-block-2">
          <div class="info-box-greeting">Welcome back Abiola!</div>
          <div class="text-block-4">Here's the updated Y{{allocation.year}} Lasubeb Action Plan overview</div>
        </div>
        <div>
          <div class="text-block-5">TOTAL ALLOCATION</div>
          <div class="text-block-6">N{{ allocation.allocation ? allocation.allocation.toLocaleString() : 0}}</div>
        </div><img src="../../../../assets/images/cuate.svg" loading="lazy" width="194" alt="" class="image-2">
      </div>
      <div class="content-tab">
        <div class="tab-title" :class="[ actionplan ? activeTabClass : '']" @click="openActionPlanTab">ACTION PLAN DATA</div>
        <div class="tab-title" :class="[ report ? activeTabClass : '']" @click="openReportTab">MONITORING REPORT DATA</div>
      </div>
      <ActionPlan @update="updateAllocation($event)" :year="year" v-show="actionplan"/>
      <MonitoringReport @update="updateAllocation($event)" :year="year" v-show="report"/>
    </div>
  </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../../components/Dashboard/SideBar.vue"
import ActionPlan from "./ActionPlan.vue"
import MonitoringReport from "./MonitoringReport.vue"
import { ProjectsList, LGEASList} from  '../../../../../commons'

import axios from "axios"
import url from '../../../../../url'
export default {
    components: {
      MobileTopbar,
      SideBar,
      ActionPlan,
      MonitoringReport
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
      allocation: {},
    }
    },
        async created(){
    
     this.projectArray = ProjectsList;
     this.lgeaArray = LGEASList; 
     await this.getAllocation()
     this.getAllocationByYear()
    },
    methods:{
      updateAllocation(value){
      this.allocation = value
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
    this.year = response.data[0].year
   
   },
            async getAllocationByYear() {
 
    const token = localStorage.getItem('pk');
   
      const response = await axios.get(`${url}/get-allocation-by-year?year=${this.year}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
      if(response.data.length <= 0) {
      
           return      this.$notify({
                        text: "No Action Plan Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
    this.allocation =response.data[0];
   
   },
      openActionPlanTab(){
     this.actionplan = true;
     this.report = false;
      },
      openReportTab(){
       this.actionplan = false;
     this.report = true;
      }

    }
}
</script>

