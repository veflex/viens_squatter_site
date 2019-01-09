import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false;
Vue.prototype.$ebus = new Vue();
Vue.prototype.$backEndUrl = 'http://localhost:3000/api/v1/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
