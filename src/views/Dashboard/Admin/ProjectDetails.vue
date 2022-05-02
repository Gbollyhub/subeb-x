<template>
    <div>
 <notifications/>
   <MobileTopbar/>
  <div class="dashboard-row">

 <SideBar/>
    <div class="dashboard-col-2">
      <div class="content-heading">
        <div class="div-block-4">
          <div class="text-block-3">Project Details</div>
       
        </div>
       <img @click="goBack" src="../../../assets/images/back.svg" loading="lazy" alt="" class="image-4">
      </div>
      <div class="app-card">
        <div class="table-header">PROJECT DETAILS</div>
        <div class="details-div">
          <div class="app-space-between with-border-bottom">
            <div class="details-text">Activities</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.activities }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Objectives</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.objectives }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Strategy</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.strategy }}</div>
            </div>
          </div>
          <div class="app-space-between with-border-bottom">
            <div class="details-text">Target Groups</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.target_groups }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Location</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.location }}</div>
            </div>
          </div>
            <div class="app-space-between with-border-bottom">
            <div class="details-text">Output</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.output }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Duration</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.duration }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Expected Outcome</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.expected_outcome }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Indicator</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.indicator }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Unit Cost</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.unit_cost }}</div>
            </div>
          </div>
          <div class="app-space-between with-border-bottom">
            <div class="details-text">Total Cost</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.total_cost }}</div>
            </div>
          </div>
          <div class="app-space-between with-border-bottom">
            <div class="details-text">Number of Projects</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.no_of_projects }}</div>
            </div>
          </div>
           <div class="app-space-between with-border-bottom">
            <div class="details-text">Year</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.year }}</div>
            </div>
          </div>
          <div class="app-space-between with-border-bottom">
            <div class="details-text">Created Date</div>
            <div>
              <div style="color:#808080" class="details-text">{{ viewDetailsData.createdAt | moment }}</div>
            </div>
          </div>
          
        </div>
      </div>
    
  </div>
    </div>
    </div>
</template>

<script src="./ProjectDetails.js"></script>

