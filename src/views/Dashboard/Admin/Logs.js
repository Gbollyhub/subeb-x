
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import axios from "axios"
import url from '../../../../url'
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
        return this.searchQuery.toLowerCase().split(' ').every(v => item.createdAt.toLowerCase().includes(v))
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

   async clearLogs() {
     const token = localStorage.getItem('pk');
try {
     await axios.delete(`${url}/clear-logs`,{ headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
     const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity:  `Logs Cleared`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
 
     this.$notify({
    text: "Logs Cleared Successfully!",
    type: 'success',
    duration: 3000,
    speed: 1000,
  })

  this.reports = []
    
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
  
      const response = await axios.get(`${url}/get-logs`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
               if(response.data.length <= 0) {
       
           return      this.$notify({
                        text: "No Logs Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }

                     const result = response.data.sort(function(a, b) {
                var c = new Date(a.createdAt);
                var d = new Date(b.createdAt);
                return d-c;
            });

    this.reports = result;
     
   },

       }
}