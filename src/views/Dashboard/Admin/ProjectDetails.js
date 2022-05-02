import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import moment from 'moment'
export default {
    filters:{
   moment: function(date){
       return moment(date).format('MMMM Do YYYY, h:mm:ss a');
   }
    },
    components: {
      MobileTopbar,
      SideBar,

    },
        data(){
    return{
      viewDetailsData: {}
      }
    },
    created(){
     this.getDetails()
    },

       methods:{
         goBack(){
          this.$router.go(-1)
         },
              getDetails(){
       const result = JSON.parse(localStorage.getItem('p-details'));
       this.viewDetailsData = result
     },


       }
}