<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
             <notifications/>
             <Loader v-show="loading"/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Projects</div>
          
        </div>
        <div class="form-block">
                    <select @change="getProject"  v-model="year"  class="app-select w-select">
                   <option v-for="item in yearArray" :key="item.year" :value="item.year">{{item.year}}</option>
                </select>            
          </div>

      </div>
      <div class="app-card">
  
       <div class="table-div" v-if="!report.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">ACTIVITIES</div></th>
    <th><div class="table-header">DURATION</div></th>
    <th><div class="table-header">TOTAL COST</div></th>
   <th><div class="table-header">.</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item, index) in report" :key="index"  >
    <td><div class="table-data">{{index + 1}}</div></td>
      <td><div class="table-data">{{item.createdAt | moment }}</div></td>
    <td><div class="table-data">{{item.activities}}</div></td>
    <td><div class="table-data">{{item.duration}}</div></td>
    <td><div class="table-data">N{{item.total_cost.toLocaleString()}}</div></td>
     <td><div class="table-data"><div style="cursor:pointer" @click="toDetails(item)" class="link">View Details</div></div></td>

  </tr>
            </tbody>
</table>
       </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script src="./ProjectsTable.js">

</script>

