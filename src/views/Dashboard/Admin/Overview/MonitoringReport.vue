<template>
  <div>
    <div class="app-card">
      <notifications />
      <Loader v-show="loading" />

      <div class="card-heading">
        <div>
          <div class="text-block-9">TEP Monitoring Report</div>
        </div>
        <div>
          <div class="form-block">
            <select v-model="project" class="app-card-select w-select">
              <option
                :disabled="
                  item.code == 1 ? false : item.code == 2 ? false : true
                "
                v-for="item in projectArray"
                :key="item.code"
                :value="item.code"
              >
                {{ item.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button @click="getReport" class="app-btn primary">Reset Report</button>
      <br /><br /><br />
      <div class="project-detail-row">
        <div
          class="prject-detail-col"
          v-for="(item, index) in seriesArray"
          :key="index"
        >
          <div class="monitoring-header">{{ item.lgea }} LGEA</div>
          <div class="div-block-16">
            <div class="monitoring-value">
              <span class="text-span-2">{{ item.completed }} </span>/
              {{ item.expected }}
            </div>
            <div class="report-graph">
              <apexchart
                type="radialBar"
                height="150"
                :options="chartOptions"
                :series="item.series"
              ></apexchart>
            </div>
          </div>
          <div class="monitoring-text">
            {{ item.completed }} Completed Projects
          </div>
          <div class="monitoring-text">
            {{ item.expected - item.completed }} Uncompleted Projects
          </div>

          <div class="monitoring-text">
            Uploaded by : {{ item.volunteer_id.first_name }}
            {{ item.volunteer_id.last_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./MonitoringReport.js"></script>

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
