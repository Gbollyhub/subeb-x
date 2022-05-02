<template>
    <div>
<!-- <div class="summary-row">
        <div class="summary-col">
          <div class="summary-title">TOTAL ALLOCATION</div>
          <div class="summary-value">N3,039,768,157.72</div>
        </div>
        <div class="summary-col">
          <div class="summary-title">COMMISSIONED PROJECTS</div>
          <div class="summary-value">200</div>
        </div>
        <div class="summary-col">
          <div class="summary-title">COMPLETED PROJECTS</div>
          <div class="summary-value">200</div>
        </div>
        <div class="summary-col">
          <div class="summary-title">ONGOING PROJECTS</div>
          <div class="summary-value">200</div>
        </div>
      </div> -->
           <div class="app-card">
                         <notifications/>
   <Loader v-show="loading"/>

        <div class="card-heading">
          <div>
            <div class="text-block-9">Breakdown Of Funds Into Programme Components</div>
          </div>
          <div>
            <div class="form-block w-form">
             <!-- <select v-model="project" class="app-card-select w-select">
                   <option v-for="item in projectArray" :key="item.code" :value="item.code">{{item.title}}</option>
                </select> -->
                <button @click="getAllReport" class="app-btn primary">Reset Action Plan</button>
            </div>
          </div>
        </div>
          

        <div class="projects-indicator-row">
          <div class="project-indicator">
            <div class="indicator-box"></div>
            <div class="indicator-text">(A) Building</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _2"></div>
            <div class="indicator-text">(B) Fencing</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _3"></div>
            <div class="indicator-text">(C) Rehabilitation</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _4"></div>
            <div class="indicator-text">(D) Furniture and Equipment</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _5"></div>
            <div class="indicator-text">(E) Water Supply</div>
          </div>
           <div class="project-indicator">
            <div class="indicator-box _6"></div>
            <div class="indicator-text">(F) Agricultural Education</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _7"></div>
            <div class="indicator-text">(G) Sport Development</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _8"></div>
            <div class="indicator-text">(H) Quality Assurance</div>
          </div>
          <div class="project-indicator">
            <div class="indicator-box _9"></div>
            <div class="indicator-text">(I) Project Monitoring</div>
          </div>
        </div>
        <div class="graph-row">
          <div class="histogram">
             <apexchart type="bar" height="350" :options="bar_chartOptions" :series="bar_series"></apexchart>
          </div>
          <div class="pie-chart">
            <div class="text-block-10">Y2019 Cost Summary</div>
           <apexchart type="pie" width="300" :options="pie_chartOptions" :series="pie_series"></apexchart>
          </div>
        </div>
        <div class="project-detail-row">
          <div class="prject-detail-col" v-for="(item, index) in actionReport" :key="index">
            <div class="detail-header" :style="{color: index == 0 ? 'rgba(0, 143, 251, 0.85)' : 
                                                       index == 1 ? 'rgba(0, 227, 150, 0.85)' : 
                                                       index == 2 ? 'rgba(254, 176, 25, 0.85)' : 
                                                       index == 3 ? 'rgba(255, 69, 96, 0.85)' : 
                                                       index == 4 ? 'rgba(119, 93, 208, 0.85)' : 
                                                       index == 5 ? 'rgba(0, 143, 251, 0.85)' : 
                                                       index == 6 ? 'rgba(0, 227, 150, 0.85)' : 
                                                       index == 7 ? 'rgba(254, 176, 25, 0.85)' : 
                                                       index == 8 ? 'rgba(255, 69, 96, 0.85)' : 'rgba(0, 143, 251, 0.85)'}">{{item.area_of_intervention}}</div>
            <div class="div-block-3">
              <div class="text-block-13">No of Projects</div>
              <div class="text-block-12">{{ item.no_of_projects }}</div>
            </div>
            <div class="div-block-3">
              <div class="text-block-13">Amount</div>
              <div class="text-block-12">N{{item.actual_amount.toLocaleString()}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
import url from '../../../../../url'
import { ProjectsList} from  '../../../../../commons'
import Loader from "../../../../components/UI/loader.vue"

export default {
  props:['year'],
    components: {
         Loader,
      
    },
    data(){
      return{
        actionReport: [],
                  bar_series: [],
          bar_chartOptions: {
            chart: {
              height: 350,
              type: 'bar',

            },
           
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
                ['A'],
                ['B'],
                ['C'],
                'D',
                ['E'],
                ['F'],
                ['G'],
                ['H'], 
                 ['I'], 
              ],
              labels: {
                style: {
                 
                  fontSize: '12px'
                }
              },
            }
          },
        project:'',
           projectArray:[],
            loading:false,
        pie_series: [],
         pie_chartOptions: {
            chart: {
              width: 300,
              type: 'pie',
            },
            labels: ['A', 'B', 'C', 'D', 'E','F','G', 'H', 'I'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
      }
    },
    created(){
      this.projectArray = ProjectsList;
    this.getAllReport();
    },
    methods:{
      
     async getAllReport(){
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


  
      
     
         const response = await axios.get(`${url}/get-breakdown?year=${this.year}`, { headers: { 'Authorization': `Bearer ${token}` } },{ timeout: 10 })
         if(response.data.length <= 0) {
           this.pie_series = []
            this.loading = false;
           return this.$notify({
                        text: "No Action Plan Found",
                        type: 'warn',
                        duration: 3000,
                        speed: 1000,
                      })
         }

         const report = response.data.map(x => {
          return {
            area_of_intervention: x.area_of_intervention,
            no_of_projects: x.no_of_projects,
            actual_amount: x.actual_amount,
          }
        })

        this.actionReport = report; 


        const temp = response.data.map(x => {
          return {
            actual_amount: x.actual_amount
          }
        })
         this.loading = false;
        const data = []
        for (let index = 0; index < temp.length; index++) {
          this.pie_series.push(temp[index].actual_amount)
          data.push(temp[index].actual_amount)
        }
  
        const tempArray =  [{ data }]

        this.bar_series = tempArray
      }
    }
}
</script>

