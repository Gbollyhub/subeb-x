<template>
  <div>
    <notifications />

    <br /><br />
    <div class="table-div" v-if="!reports.length <= 0">
      <table>
        <thead>
          <tr>
            <th><div class="table-header">S/N</div></th>
            <th><div class="table-header">CREATED DATE</div></th>
            <th><div class="table-header">ACTION PLAN</div></th>
            <th><div class="table-header">.</div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in reports" :key="index">
            <td>
              <div class="table-data">{{ index + 1 }}</div>
            </td>
            <td>
              <div class="table-data">{{ item.createdAt | moment }}</div>
            </td>
            <td>
              <div class="table-data">{{ item.year }}</div>
            </td>
            <td>
              <div class="table-data">
                <div
                  @click="deleteActionPlan(item, index)"
                  style="cursor: pointer; padding: 10px"
                  class="app-btn danger"
                >
                  Delete
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../../../../../url";
import moment from "moment";
export default {
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },

  data() {
    return {
      searchQuery: "",
      activeTabClass: "active-tab",
      reports: [],
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.reports.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.year.toLowerCase().includes(v));
        });
      } else {
        return this.reports;
      }
    },
  },
  created() {
    this.getReports();
  },
  methods: {
    async deleteActionPlan(item, index) {
      const token = localStorage.getItem("pk");

      try {
        await axios.delete(
          `${url}/remove-allocation?year=${item.year}`,
          { headers: { Authorization: `Bearer ${token}` } },
          { timeout: 10 }
        );
        await axios.delete(
          `${url}/remove-breakdown?year=${item.year}`,
          { headers: { Authorization: `Bearer ${token}` } },
          { timeout: 10 }
        );
        await axios.delete(
          `${url}/remove-allreport?year=${item.year}`,
          { headers: { Authorization: `Bearer ${token}` } },
          { timeout: 10 }
        );
        const user_id = JSON.parse(localStorage.getItem("user"))._id;
        const logData = {
          activities: {
            activity: `Action Plan Deleted. Details: Year: ${item.year}`,
          },
          user_id: user_id,
        };
        await axios.post(`${url}/register-log`, logData);
        this.reports.splice(index, 1);
        this.$notify({
          text: "Action Plan Deleted Successfully!",
          type: "success",
          duration: 3000,
          speed: 1000,
        });
      } catch (error) {
        this.$notify({
          text: error.response.data.error,
          type: "error",
          duration: 3000,
          speed: 1000,
        });
      }
    },
    async getReports() {
      const token = localStorage.getItem("pk");

      const response = await axios.get(
        `${url}/get-allocation`,
        { headers: { Authorization: `Bearer ${token}` } },
        { timeout: 10 }
      );
      if (response.data.length <= 0) {
        return this.$notify({
          text: "No Action Plan Found",
          type: "warn",
          duration: 3000,
          speed: 1000,
        });
      }
      const result = response.data.sort(function (a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d - c;
      });

      this.reports = result;
    },
    toEditProject(item) {
      localStorage.setItem("edit", JSON.stringify(item));
      this.$router.push("/edit-report");
    },
  },
};
</script>
