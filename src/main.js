// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

fontawesome.library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = process.env.FANATIC_API
Vue.prototype.$http.defaults.headers.common['Authorization'] = process.env.FANATIC_KEY

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
