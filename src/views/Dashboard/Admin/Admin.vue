<template>
    <div>
   <MobileTopbar/>
  <div class="dashboard-row">
 <SideBar/>
        <div class="dashboard-col-2">
             <notifications/>
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Admin</div>
         
        </div>
        <router-link to="/add-admin" class="app-btn primary">Add new Admin</router-link>
      </div>
      <div class="app-card">
        <div class="app-space-between">
          <div class="form-block-2">
    <input v-model="searchQuery" type="text" class="app-card-select w-input" placeholder="Search by firstname">
          </div>
         
        </div>
       <br><br>
       <div class="table-div" v-if="!resultQuery.length <= 0">
        <table>
            <thead>
  <tr>
    <th><div class="table-header">S/N</div></th>
    <th><div class="table-header">CREATED DATE</div></th>
    <th><div class="table-header">FIRST NAME</div></th>
    <th><div class="table-header">LAST NAME</div></th>
    <th><div class="table-header">PHONE NUMBER</div></th>
    <th><div class="table-header">EMAIL ADDRESS</div></th>
  </tr>
            </thead>
            <tbody>
  <tr v-for="(user, index) in resultQuery" :key="index"  >
    <td><div class="table-data">{{index + 1}}</div></td>
    <td><div class="table-data">{{user.createdAt | moment}}</div></td>
    <td><div class="table-data">{{user.first_name}}</div></td>
    <td><div class="table-data">{{user.last_name}}</div></td>
    <td><div class="table-data">{{user.phone_number}}</div></td>
    <td><div class="table-data">{{user.email_address}}</div></td>
  </tr>
            </tbody>
</table>
       </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script src="./Admin.js"></script>

