import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin'
import md5 from 'js-md5'
//阻止启动生产消息

Vue.prototype.$md5 = md5;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
