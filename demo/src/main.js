import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Install from '@/install'

Vue.config.productionTip = false
Vue.use(Install);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
