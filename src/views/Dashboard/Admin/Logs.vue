<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
           <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Logs</div>
         
        </div>
       
      </div>
      <div class="app-card">
        <div class="app-space-between">
          <div class="form-block-2">
    <input v-model="searchQuery" type="text" class="app-card-select w-input" placeholder="Search Date">
          </div>
           <div  @click="clearLogs()" style="cursor:pointer;padding:10px" class="app-btn danger">Clear Logs</div>
        </div>
       <br><br>
       <div class="table-div"  v-if="!resultQuery.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">ACTIVITY</div></th>
    <th><div class="table-header">USER</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(item, index) in resultQuery" :key="index" >
    <td><div class="table-data">{{index + 1}}</div></td>
     <td><div class="table-data">{{item.createdAt | moment }}</div></td>
    <td><div class="table-data">{{item.activities.activity}}</div></td>
    <td><div class="table-data">{{item.user_id ? `${item.user_id.first_name} ${item.user_id.last_name}` : null}}</div></td>
   
  </tr>
            </tbody>
</table>
       </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script src="./Logs.js"></script>

