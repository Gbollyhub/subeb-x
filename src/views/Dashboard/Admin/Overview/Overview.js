
import MobileTopbar from "../../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../../components/Dashboard/SideBar.vue"
import AllocationInfo from "../../../../components/Dashboard/Overview/AllocationInfo.vue"
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
      MonitoringReport,
      AllocationInfo
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


