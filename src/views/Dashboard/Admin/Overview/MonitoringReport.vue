<template>
    <div>
      <div class="lg-modal"  v-show="lg_details">

              <div class="app-card modal-card">


                
         <div class="app-space-between">
        <div class="table-header" style=" font-size:16px;font-weight:600; color:black;text-transform:uppercase">{{lg_data.lgea}} DETAILS</div>
        <div  @click="lg_details = false" style="cursor:pointer;font-size:16px;font-weight:600">X</div>
         </div>
        <br><br>
          <div class="table-div"  v-if="!lg_data.school <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">SCHOOL NAME</div></th>
        <th><div class="table-header">CATEGORY</div></th>
    <th><div class="table-header">STAGE OF COMPLETION</div></th>
    <th><div class="table-header">IMAGES</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item,index) in lg_data.school" :key="index" >
    <td><div class="table-data">{{index + 1}}</div></td>
    <td><div class="table-data">{{item.date | moment }}</div></td>
    <td><div class="table-data">{{item.school_name}}</div></td>
    <td><div class="table-data">{{item.school_cat}}</div></td>
    <td><div class="table-data">{{
      item.stages == 1 ? 'Completed' :
      item.stages == 2 ? 'Ongoing' :
      item.stages == 3 ? 'Abandoned' :
      item.stages == 4 ? 'Not Started' : ''
    }}</div></td>
    <td>
      <div  v-if="item.images.length > 0" @click="imageIndex = 0" style="text-align:left;cursor:pointer"  class="link">View Images</div>
       <div v-else style="color:red;text-align:left;cursor:pointer"  class="link">No Images</div>
        <CoolLightBox 
            :items="item.images" 
            :index="imageIndex"
            @close="imageIndex = null">
          </CoolLightBox>
    </td>

  </tr>
            </tbody>
</table>
       </div>
       
              </div>
      </div>
           <div class="app-card">
              <notifications/>
   <Loader v-show="loading"/>
  
        <div class="card-heading">
          <div>
            <div class="text-block-9">TEP Monitoring Report</div>
          </div>
          <div>
            <div class="form-block ">
              <select v-model="project" class="app-card-select w-select">
                   <option :disabled="item.code == 1 ? false : item.code == 2 ? false : true" v-for="item in projectArray" :key="item.code" :value="item.code">{{item.title}}</option>
                </select>
     
            </div>
          </div>
        </div>
        <button @click="getReport" class="app-btn primary">Reset Report</button>
        <br><br><br>
        <div class="project-detail-row">
          <div class="prject-detail-col" v-for="(item, index) in seriesArray" :key="index">
            <div class="monitoring-header">{{item.lgea}} LGEA</div>
            <div class="div-block-16">
              <div class="monitoring-value"><span class="text-span-2">{{item.completed}} </span>/ {{item.expected}}</div>
              <div class="report-graph">
   <apexchart type="radialBar" height="150" :options="chartOptions" :series="item.series"></apexchart>
              </div>
                
            </div>
            <div class="monitoring-text">{{item.completed}} Completed Projects</div>
            <div class="monitoring-text">{{item.expected - item.completed}} Uncompleted Projects</div>

             <div class="monitoring-text">Uploaded by : {{item.volunteer_id.first_name}} {{item.volunteer_id.last_name}}</div>
            <div style="cursor:pointer" @click="openLgDetails(item)"  class="link">View Details</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
import url from '../../../../../url'
import { ProjectsList, LGEASList} from  '../../../../../commons'
import Loader from "../../../../components/UI/loader.vue"
import moment from 'moment'
export default {
    filters:{
   moment: function(date){
       return moment(date).format('MMMM Do YYYY, h:mm:ss a');
   }
  },
  props:['year'],
    components: {
         Loader,    
    },
  data(){
   return{
          lg_data: {},
          lg_details: false,
          imageIndex: null,
          seriesArray: [],
          chartOptions: {
            chart: {
              height: 150,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: false,
                  }
                }
              }
            },
            colors: ['#1ab7ea'],
            legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 160,
              offsetY: 15,
              labels: {
                useSeriesColors: true,
              },
              markers: {
                size: 0
              },
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
                vertical: 3
              }
            },
  
          },
     report:[],
     projectArray:[],
     project:1,
     loading:false,
   }
  },
      created(){   
     this.projectArray = ProjectsList;
    this.getReport()
    },
    methods:{
    
    async openLgDetails(item){
    this.lg_details = true;
    this.lg_data = item;
    },

     async getReport(){

        this.loading = true;
        
                const token = localStorage.getItem('pk');

        const result = await axios.get(`${url}/get-allocation-by-year?year=${this.year}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
      if(result.data.length <= 0) {
           return      this.$notify({
                        text: "No Action Plan Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }
    const allocation =result.data[0];
    this.$emit('update', allocation);

      
        
         const response = await axios.get(`${url}/comparison?year=${this.year}&project=${this.project}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
         if(response.data.length <= 0) {
           this.seriesArray = []
            this.loading = false;
           return      this.$notify({
                        text: "No Report Found",
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
         this.loading = false;
         console.log(">>>>>>>>>", temp)

        this.seriesArray = temp  

   
      }
    }
}
</script>

<style scoped>
.lg-modal {
      display: flex;
    background: rgba(22, 22, 22, 0.6);
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999999;
}
.modal-card {
  flex: none !important;
  width: 60% !important;
  width: 70vh;
  overflow: auto;
}

@media screen and (max-width: 479px) {

.modal-card {

  width: 90% !important;
}

}
</style>
