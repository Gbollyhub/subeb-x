import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import axios from "axios"
import url from '../../../../url'
import moment from 'moment'
export default {
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  components: {
    MobileTopbar,
    SideBar
  },
  data() {
    return {
      searchQuery: '',
      activeTabClass: 'active-tab',
      admins: []
    }
  },
  computed: {

    resultQuery() {
      if (this.searchQuery) {
        return this.admins.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.first_name.toLowerCase().includes(v))
        })
      } else {
        return this.admins;
      }
    },
  },
  created() {
    this.getAdmin();
  },
  methods: {
    async getAdmin() {

      const token = localStorage.getItem('pk');
      const response = await axios.get(`${url}/get-users`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (response.data.length <= 0) {

        return this.$notify({
          text: "No Admin Found",
          type: 'warn',
          duration: 3000,
          speed: 1000,
        })
      }
      const filterArray = response.data
      const sortArray = filterArray.filter(x => {
        return x.role == 0;
      })
      const newArray = sortArray.sort(function (a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d - c;
      });
      this.admins = newArray;

    }
  }
}