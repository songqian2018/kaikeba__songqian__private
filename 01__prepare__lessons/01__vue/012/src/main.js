import Vue from 'vue'
import App from './App.vue'
import router from './router'
import focus from './directive/focus'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.directive('focus', focus)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
