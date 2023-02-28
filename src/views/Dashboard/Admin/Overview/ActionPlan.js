import axios from "axios"
import url from '../../../../../url'
import { ProjectsList } from '../../../../../commons'
import Loader from "../../../../components/UI/loader.vue"

export default {
  props: ['year'],
  components: {
    Loader,

  },
  data() {
    return {
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
      project: '',
      projectArray: [],
      loading: false,
      pie_series: [],
      pie_chartOptions: {
        chart: {
          width: 300,
          type: 'pie',
        },
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
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
  created() {
    this.projectArray = ProjectsList;
    this.getAllReport();
  },
  methods: {

    async getAllReport() {
      this.loading = true;
      const token = localStorage.getItem('pk');

      const result = await axios.get(`${url}/get-allocation-by-year?year=${this.year}`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (result.data.length <= 0) {
        return this.$notify({
          text: "No Action Plan Found",
          type: 'warn',
          duration: 3000,
          speed: 1000,
        })
      }
      const allocation = result.data[0];
      this.$emit('update', allocation);





      const response = await axios.get(`${url}/get-breakdown?year=${this.year}`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (response.data.length <= 0) {
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

      const tempArray = [{ data }]

      this.bar_series = tempArray
    }
  }
}