import Vue from 'vue'
import App from './App'
import router from './router'
import Cube from 'cube-ui'
import VueWeChatTitle from 'vue-wechat-title'
import './utils/vuefilter'
import '../node_modules/amfe-flexible/index'
import './assets/icon/iconfont.css'
import tool from '@/utils/common';
import server from '@/utils/request.js'
Vue.prototype.axios = server
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
Vue.use(VueWeChatTitle)
Vue.use(Cube)








Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
