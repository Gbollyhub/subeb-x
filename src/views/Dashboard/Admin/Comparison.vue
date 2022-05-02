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
          <div class="text-block-3">Comparison</div>
         
        </div>
      
      </div>
 <div class="app-card">
        <div class="text-block-9 margin-bottom">Breakdown Of Funds Into Programme Components</div>
   
        <div>
          <form>
            <div class="auth-form-col half-col margin-bottom"><label for="name" class="auth-form-label black">Select a Project</label>
            <select v-model="project" class="app-select w-select">
                <option v-for="item in projectArray" :key="item.code" :value="item.code">{{item.title}}</option>
              </select></div>
            <div class="auth-form-col margin-bottom"><label for="name" class="auth-form-label black">Select years</label>
              <div class="div-block-19">
                <label class="w-checkbox checkbox-field" v-for="(item, index) in yearArray" :key="item.year">
                  <input type="checkbox" @click="addToActivity(item, index)" :id="`A${item.year}`" name="checkbox" data-name="Checkbox" class="w-checkbox-input">
                  <span class="checkbox-label w-form-label" for="checkbox">{{item.year}}</span>
                </label>
                      </div>
            </div>

          </form>
         
        </div>
        <div v-if="isNoResult" @click="compare" style="cursor:pointer" class="app-btn primary margin-top">Generate Comparison</div>
        <div v-else @click="refreshPage" style="cursor:pointer" class="app-btn primary margin-top">Retry Another Comparison</div>
        <br><br><br><br>
        <div v-show="seriesArray.length > 0" class="text-block-9 margin-bottom">Result</div>
        <div class="app-space-between">
          <div class="comparison-col" v-for="(item, index) in seriesArray" :key="index">
            <div class="comparison-year">{{item.year}}</div>
          <apexchart type="bar" height="350" :options="chartOptions" :series="item.series"></apexchart>
          </div>
         
        </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import axios from "axios"
import url from '../../../../url'
import { ProjectsList, LGEASList} from  '../../../../commons'
import Loader from "../../../components/UI/loader.vue"
export default {
    components: {
         Loader,
      MobileTopbar,
      SideBar
    },
        data(){
    return{
         isNoResult : true,
          seriesArray:[],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar'
            },
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            colors: ['#00E396'],
            dataLabels: {
              formatter: function(val, opt) {
                const goals =
                  opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                    .goals
            
                if (goals && goals.length) {
                  return `${val} / ${goals[0].value}`
                }
                return val
              }
            },
            legend: {
              show: true,
              showForSingleSeries: true,
              customLegendItems: ['Actual', 'Expected'],
              markers: {
                fillColors: ['#00E396', '#775DD0']
              }
            }
          },
              
  
      activeTabClass: 'active-tab',
    admins:[],
    yearArray: [],
      projectArray: [],
      lgeaArray: [],
      project: '',
      activityArray:[],
      compareData: [],
        loading:false,
    }   
    },
      created(){
     
     this.projectArray = ProjectsList;
     this.lgeaArray = LGEASList; 
     this.getAllocation()
    },
       methods:{
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
               async addToActivity(activity){
        let Avalue = await parseInt(activity.year)
      var checkbox = document.getElementById(`A${activity.year}`);
       const state = await this.activityArray.some(activity => { return activity == Avalue })
      
      if (state == false && checkbox.checked == true){
   
    this.activityArray.push(Avalue);
  }
  else{
   
     const newIndex = this.activityArray.findIndex( result => { return result == Avalue})
       await this.activityArray.splice(newIndex, 1); 
      
      }
      },
      async compare(){
        if(this.project == '' || this.activityArray.length < 0){
          return       this.$notify({
                      text: "Project or Year cannot be empty. Try Agaim",
                      type: 'error',
                      duration: 3000,
                      speed: 1000,
                    })
        }
        this.compareData = []
        this.loading =true;
             const token = localStorage.getItem('pk');
      for (let index = 0; index < this.activityArray.length; index++) {
 
        const response = await axios.get(`${url}/comparison?year=${this.activityArray[index]}&project=${this.project}`, { headers: { 'Authorization': `Bearer ${token}` } })

         if(response.data.length <= 0) {
           this.loading =false;
           return      this.$notify({
                        text: `No Report for Y${this.activityArray[index]} `,
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
         const final_array = [];
         let num = 1;
          for(let j = 0; j < response.data.length ; j++) {
            
       if(response.data[j].lgea === num){
          let final_obj = {
            'series': [],
            'project': response.data[j].project,
            'lgea': response.data[j].lgea,
            'expected': response.data[j].expected,
            'completed': 0,
            'year': response.data[j].year,
            'school':[],
            'volunteer_id': response.data[j].volunteer_id,
         }

        
         for(let i = 0; i < response.data.length ; i++) {
            
           if(response.data[i].lgea === num){
               
            final_obj.completed += response.data[i].stages == 1 ? 1 : 0,
            final_obj.school.push({
              'date': response.data[i].createdAt,
              'school_name': response.data[i].school_name,
              'school_cat': response.data[i].school_category,
              'stages': response.data[i].stages,
              'images': response.data[i].images
              })
           }
         }
          
          final_obj.series = [(final_obj.completed/final_obj.expected) * 100]
         
          final_array.push(final_obj);
          num += 1;
       }
          }
          
           const temp = final_array.map(x => {
          return {
            ...x,
            project: ProjectsList.find((entry)=>{return x.project === entry.code}).title,
            lgea: LGEASList.find((entry)=>{return x.lgea === entry.code}).title,
          }
        })
        this.compareData.push(temp)
      }

          this.plotGraph()
          const user_id = JSON.parse(localStorage.getItem('user'))._id;
      const logData = {
           "activities": { activity: `Comparison made Details : ${this.activityArray},${this.project}`},
            "user_id": user_id,
        }
        await axios.post(`${url}/register-log`, logData)
       this.loading =false;
       },

       plotGraph(){
        for (let index = 0; index < this.compareData.length; index++) {
 

         this.seriesArray.push(

                      { 
                        year: this.compareData[index][0].year,
                        series: [
                        {
                        name: ProjectsList.find((entry)=>{return this.project === entry.code}).title,
                        data: []
                       }
                          ]
                        }   
                        );
        }
         
        
         for (let j = 0; j < this.seriesArray.length; j++) {
           const temp = []
          for (let k = 0; k <  this.compareData[j].length; k++) {
            
           temp.push(           
              {
                  x: this.compareData[j][k].lgea,
                  y: this.compareData[j][k].completed,
                  goals: [
                    {
                      name: 'Expected',
                      value: this.compareData[j][k].expected,
                      strokeWidth: 4,
                      strokeDashArray: 2,
                      strokeColor: '#775DD0'
                    }
                  ]
                })
            
          }
            this.seriesArray[j].series[0].data = temp;
            this.isNoResult =false;
         }
  
       },

       refreshPage(){
         location.reload()
       }
                

       }
}
</script>

