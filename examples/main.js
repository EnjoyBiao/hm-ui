import Vue from 'vue'
import App from './App.vue'
import DemoUI from '../packages'
Vue.config.productionTip = false
Vue.use(DemoUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
