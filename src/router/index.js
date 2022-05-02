import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Overview from '../views/Dashboard/Admin/Overview/Overview'
import Settings from '../views/Dashboard/Admin/Settings/Settings'
import Admin from '../views/Dashboard/Admin/Admin'
import AddAdmin from '../views/Dashboard/Admin/AddAdmin'
import Volunteers from '../views/Dashboard/Admin/Volunteers'
import ReportForm from '../views/Dashboard/Volunteers/ReportForm'
import Uploads from '../views/Dashboard/Volunteers/Uploads'
import EditReport from '../views/Dashboard/Volunteers/EditReport'
import Comparison from '../views/Dashboard/Admin/Comparison'
import Projects from '../views/Dashboard/Admin/Projects'
import Project from '../views/Dashboard/Admin/ProjectsTable'
import ProjectDetails from '../views/Dashboard/Admin/ProjectDetails'
import Logs from '../views/Dashboard/Admin/Logs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta :{
      requiresGuestAdmin: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta :{
      requiresGuestAdmin: true
    }
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/add-admin',
    name: 'AddAdmin',
    component: AddAdmin,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/report-form',
    name: 'ReportForm',
    component: ReportForm,
    meta :{
      requiresAuth: true
    }
  },
  
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: Volunteers,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/uploads',
    name: 'Uploads',
    component: Uploads,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/edit-report',
    name: 'EditReport',
    component: EditReport,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: Comparison,
    meta :{
      requiresAuth: true
    }
  }
  ,
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta :{
      requiresAuth: true
    }
  }
  
  ,
  {
    path: '/project/:id',
    name: 'Project',
    component: Project,
    meta :{
      requiresAuth: true
    }
  }
  
  ,
  {
    path: '/project-details',
    name: 'ProjectDetails',
    component: ProjectDetails,
    meta :{
      requiresAuth: true
    }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta :{
      requiresAuth: true
    }
  }

  
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('pk')) {
      next();
    }
    else {    
      next({path: '/'});
    }
  } 

 else if(to.matched.some(record => record.meta.requiresGuestAdmin)){
   if(localStorage.getItem('pk') && localStorage.getItem('role') == 0){
     next({
       path: '/overview',
       query: {
         redirect: to.fullPath
       }
     })
   }
   else if(localStorage.getItem('pk') && localStorage.getItem('role') == 1){
    next({
      path: '/volunteers-form',
      query: {
        redirect: to.fullPath
      }
    })
  }
   else{
     next();
   }

}

else{
 next();
}
});

export default router
