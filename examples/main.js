import Vue from 'vue'
import App from './App.vue'
import viewdesign from 'view-design'
import DemoUI from '../packages'
import 'view-design/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.use(DemoUI)
Vue.use(viewdesign)
new Vue({
  render: h => h(App),
}).$mount('#app')
