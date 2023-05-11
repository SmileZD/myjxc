import Vue from 'vue'
import App from './App.vue'
import router from './router'

// element-ui组件
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

// axios组件
import request from "./axios";
Vue.prototype.$axios = request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
