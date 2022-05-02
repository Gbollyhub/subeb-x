<template>
    <div>
    <!-- app topbar -->
   <MobileTopbar/>
  <div class="dashboard-row">
      <!-- app sidebar --> 
       <SideBar/>
    <div class="dashboard-col-2">
        <!-- app notification utility -->
       <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Dashboard</div>        
        </div>
        <div>
          <div class="form-block">
                        <select v-model="year"  class="app-select w-select">
                   <option v-for="item in yearArray" :key="item.year" :value="item.year">{{item.year}}</option>
                </select>
          </div>
        </div>
      </div>
        <!-- allocation info -->
      <AllocationInfo :allocation="allocation"/>

      <!-- overview content tab -->
      <div class="content-tab">
        <div class="tab-title" :class="[ actionplan ? activeTabClass : '']" @click="openActionPlanTab">ACTION PLAN DATA</div>
        <div class="tab-title" :class="[ report ? activeTabClass : '']" @click="openReportTab">MONITORING REPORT DATA</div>
      </div>

      <!-- overview content tab items -->
      <ActionPlan @update="updateAllocation($event)" :year="year" v-show="actionplan"/>
      <MonitoringReport @update="updateAllocation($event)" :year="year" v-show="report"/>
    </div>
  </div>
    </div>
</template>

<script src="./Overview.js"></script>