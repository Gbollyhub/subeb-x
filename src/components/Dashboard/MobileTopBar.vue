<template>
  <div>
    <div class="menu-modal" v-show="isMobileMenu">
      <router-link to="#" class="close-btn">
        <div @click="isMobileMenu = false">CLOSE-MENU</div>
      </router-link>

      <div class="dashboard-nav-links-div">
        <router-link
          active-class="active-nav"
          v-show="role == 0 || role == 2"
          to="/overview"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/bx_bxs-dashboard.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Dashboard</div>
        </router-link>
        <router-link
          active-class="active-nav"
          v-show="role == 1 || role == 2"
          to="/report-form"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/form-icon.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Monitoring Tool</div>
        </router-link>
        <router-link
          active-class="active-nav"
          v-show="role == 0 || role == 2"
          to="/projects"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/projects.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Projects</div>
        </router-link>
        <router-link
          active-class="active-nav"
          v-show="role == 0 || role == 2"
          to="/admin"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/bx_bxs-user.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Admin</div>
        </router-link>
        <router-link
          active-class="active-nav"
          to="/settings"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/settings.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Settings</div>
        </router-link>
        <router-link
          active-class="active-nav"
          v-show="role == 0 || role == 2"
          to="/logs"
          class="dashboard-nav-link"
          ><img
            src="../../assets/images/data-icon.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Logs</div>
        </router-link>
      </div>
      <div class="div-block">
        <div
          @click="Logout"
          style="cursor: pointer"
          class="dashboard-nav-link logout"
        >
          <img
            src="../../assets/images/carbon_logout.svg"
            loading="lazy"
            alt=""
            class="nav-icon"
          />
          <div>Logout</div>
        </div>
      </div>
    </div>
    <div class="app-nav mobile">
      <img
        style="margin-top: 10px"
        height="50"
        src="https://res.cloudinary.com/dja6wv2sl/image/upload/v1651529994/Frame_2_1_emtqgp.svg"
        loading="lazy"
        alt=""
      /><img
        @click="isMobileMenu = true"
        src="../../assets/images/ant-design_menu-outlined-1.svg"
        loading="lazy"
        width="32"
        alt=""
      />
    </div>
  </div>
</template>

<script src="./MobileTopBar.js"></script>
