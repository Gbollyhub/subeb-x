import axios from "axios"
import url from '../../../../../url'
import { ProjectsList, LGEASList } from '../../../../../commons'
import Loader from "../../../../components/UI/loader.vue"
import moment from 'moment'
export default {
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  props: ['year'],
  components: {
    Loader,
  },
  data() {
    return {
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
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },

      },
      report: [],
      projectArray: [],
      project: 1,
      loading: false,
    }
  },
  created() {
    this.projectArray = ProjectsList;
    this.getReport()
  },
  methods: {

    async openLgDetails(item) {
      this.lg_details = true;
      this.lg_data = item;
    },

    async getReport() {

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



      const response = await axios.get(`${url}/comparison?year=${this.year}&project=${this.project}`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (response.data.length <= 0) {
        this.seriesArray = []
        this.loading = false;
        return this.$notify({
          text: "No Report Found",
          type: 'warn',
          duration: 3000,
          speed: 1000,
        })
      }




      const final_array = [];
      let num = 1;
      for (let j = 0; j < response.data.length; j++) {

        if (response.data[j].lgea === num) {
          let final_obj = {
            'series': [],
            'project': response.data[j].project,
            'lgea': response.data[j].lgea,
            'expected': response.data[j].expected,
            'completed': 0,
            'year': response.data[j].year,
            'school': [],
            'volunteer_id': response.data[j].volunteer_id,
          }


          for (let i = 0; i < response.data.length; i++) {

            if (response.data[i].lgea === num) {

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

          final_obj.series = [(final_obj.completed / final_obj.expected) * 100]

          final_array.push(final_obj);
          num += 1;
        }
      }

      const temp = final_array.map(x => {
        return {
          ...x,
          project: ProjectsList.find((entry) => { return x.project === entry.code }).title,
          lgea: LGEASList.find((entry) => { return x.lgea === entry.code }).title,
        }
      })
      this.loading = false;
      console.log(">>>>>>>>>", temp)

      this.seriesArray = temp


    }
  }
}