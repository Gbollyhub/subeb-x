<template>
  <div>
    <MobileTopbar />
    <div class="dashboard-row">
      <SideBar />
      <div class="dashboard-col-2">
        <notifications />
        <div class="content-heading">
          <div class="div-block-4">
            <div class="text-block-3">Area of Intervention</div>
          </div>
          <div></div>
        </div>
        <div class="projects-row">
          <ProjectCard
            v-for="(item, index) in projectArray"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Projects.js"></script>
