import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VueApexCharts from 'vue-apexcharts'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

Vue.use(CoolLightBox)

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
