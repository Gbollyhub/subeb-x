import MobileTopbar from "../../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../../components/Dashboard/SideBar.vue"
import Profile from "./Profile.vue"


export default {
  components: {
    MobileTopbar,
    SideBar,
    Profile,
  },
  data() {
    return {
      role: JSON.parse(localStorage.getItem('role')),
      activeTabClass: 'active-tab',
      profile: true,
      upload: false,
      upload_table: false,
      publish: false,
      report: false
    }
  },
  methods: {

    openProfile() {
      this.profile = true;
      this.upload = false;
      this.upload_table = false;
      this.publish = false;
      this.report = false;
    },

    openUpload() {
      this.profile = false;
      this.upload = true;
      this.upload_table = false;
      this.publish = false;
      this.report = false;
    },

    openUploadTable() {
      this.profile = false;
      this.upload = false;
      this.upload_table = true;
      this.publish = false;
      this.report = false;
    },

    openPublish() {
      this.profile = false;
      this.upload = false;
      this.upload_table = false;
      this.publish = true;
      this.report = false;
    },

    openReport() {
      this.profile = false;
      this.upload = false;
      this.upload_table = false;
      this.publish = false;
      this.report = true;
    },

  }
}