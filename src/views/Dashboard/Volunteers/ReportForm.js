import MobileTopbar from "../../../components/Dashboard/MobileTopBar.vue"
import SideBar from "../../../components/Dashboard/SideBar.vue"
import Loader from "../../../components/UI/loader.vue"
import axios from "axios"
import url from '../../../../url'
import { stagesList, schoolCategoryList, ProjectsList, LGEASList } from '../../../../commons'

export default {
  components: {
    Loader,
    MobileTopbar,
    SideBar,

  },
  data() {
    return {
      stagesArray: [],
      categoryArray: [],
      yearArray: [],
      projectArray: [],
      lgeaArray: [],
      previewSource: [],
      user: {
        id: '',
        lgea: '',
        schoolCategory: '',
        schoolName: '',
        project: '',
        year: '',
        volunteer_id: '',
        stages: '',
        images: [],
        expected: 0
      },
      loading: false
    }
  },
  created() {
    this.stagesArray = stagesList;
    this.categoryArray = schoolCategoryList;
    this.projectArray = ProjectsList;
    this.lgeaArray = LGEASList;
    this.getAllocation()
  },

  methods: {
    async getExpectedValue() {
      this.loading = true
      const token = localStorage.getItem('pk');
      const response = await axios.get(`${url}/get-lgea-projectdata?year=${this.user.year}&project=${this.user.project}&location=${this.user.lgea}`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (response.data.length <= 0) {
        this.loading = false
        return this.$notify({
          text: "No Action Plan Found",
          type: 'warn',
          duration: 3000,
          speed: 1000,
        })
      }
      this.loading = false
      this.user.expected = response.data[0].no_of_projects
    },

    async getAllocation() {

      const token = localStorage.getItem('pk');

      const response = await axios.get(`${url}/get-allocation`, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
      if (response.data.length <= 0) {

        return this.$notify({
          text: "No Action Plan Found",
          type: 'warn',
          duration: 3000,
          speed: 1000,
        })
      }
      this.yearArray = response.data;
      this.user.year = response.data[0].year

    },

    clearStore() {
      this.previewSource = []
      this.user.images = []
    },

    pickedFile(e) {
      const sizes = []

      for (let i = 0; i < e.target.files.length; i++) {
        if (typeof (e.target.files) != "undefined") {
          var size = parseFloat(e.target.files[i].size / 1024).toFixed(2);
          sizes.push(size);
        } else {
          alert("This browser does not support HTML5.");
        }
      }

      let validateSize = sizes.some(x => {
        return x > 100;
      })

      if (validateSize) {
        return this.$notify({
          text: "Some Images exceeds 100kb",
          type: 'error',
          duration: 3000,
          speed: 1000,
        })
      }

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        this.image_name = file.name;

        this.previewFile(file);
      }

    },

    previewFile(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.previewSource.push(reader.result);
        this.user.images.push(reader.result);
      };
    },




    async register() {
      var formData = new FormData();
      const token = localStorage.getItem('pk');
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      // const resData = {
      //         "lgea": this.user.lgea,
      //         "expected": parseInt(this.user.expected),
      //         "completed": parseInt(this.user.completed),
      //         "project": this.user.project,
      //         "year": this.user.year,
      //         "volunteer_id": userId,
      //         "images": this.user.images
      //  }

      formData.append("lgea", this.user.lgea);
      formData.append("school_name", this.user.schoolName);
      formData.append("school_category", this.user.schoolCategory);
      formData.append("project", this.user.project);
      formData.append("year", this.user.year);
      formData.append("volunteer_id", userId);
      formData.append("stages", parseInt(this.user.stages))
      formData.append("expected", parseInt(this.user.expected))
      //  formData.append("images", this.$refs.fileInput.files[0]);

      for (let index = 0; index < this.$refs.fileInput.files.length; index++) {
        formData.append('images', this.$refs.fileInput.files[index]);
      }

      try {
        this.loading = true
        await axios.post(`${url}/register-report`, formData, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }, { timeout: 10 })

        if (typeof window !== 'undefined') {
          const newData = { "_id": "62517e4a10c70a1fb07d2a20", "publish": false }
          await axios.patch(`${url}/update-publish`, newData, { headers: { 'Authorization': `Bearer ${token}` } }, { timeout: 10 })
          const user_id = JSON.parse(localStorage.getItem('user'))._id;
          const logData = {
            "activities": { activity: `Monitoring Report Added` },
            "user_id": user_id,
          }
          await axios.post(`${url}/register-log`, logData)
          this.loading = false

          this.$notify({
            text: "Report Submitted Successfully!",
            type: 'success',
            duration: 3000,
            speed: 1000,
          })
          this.clearStore();
          this.user.lgea = "";
          this.user.stages = "";
          this.user.schoolName = "";
          this.user.schoolCategory = "";
          this.user.project = "";
          this.user.year = "";
        }
      }
      catch (error) {
        this.loading = false
        this.$notify({
          text: error.response.data.error,
          type: 'error',
          duration: 3000,
          speed: 1000,
        })

      }

    }

  }
}