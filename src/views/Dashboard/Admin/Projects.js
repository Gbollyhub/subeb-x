import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import ProjectCard from "../../../components/Dashboard/Projects/ProjectCard.vue"

import { ProjectsList } from '../../../../commons'


export default {
  components: {
    MobileTopbar,
    SideBar,
    ProjectCard
  },
  data() {
    return {
      activeTabClass: 'active-tab',
      actionplan: true,
      report: false,
      yearArray: [],
      projectArray: [],
      lgeaArray: [],
      year: 2019,
      allocation: {}
    }
  },
  created() {

    this.projectArray = ProjectsList;

  },
  methods: {


  }
}