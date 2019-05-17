import Vue from 'vue'
import App from './App'

import cube from 'cube-ui'
import router from '@/router'
import store from '@/store'

import vueLazyLoad from 'vue-lazyload'
import fastClick from 'fastclick'
// import vconsole from 'vconsole'

import '@/styles/index.scss' // global css

import '@/utils' // 依赖

fastClick.attach(document.body)
// const vConsole = new vconsole()

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.use(cube)
Vue.use(require('vue-wechat-title')) // 微信切换title
Vue.use(vueLazyLoad, {
  loading: './static/img/loading.png',
  error: './static/img/404.png'
})
Vue.config.productionTip = false // eslint-disable no-new

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
