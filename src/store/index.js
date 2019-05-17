import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import wxConfig from './modules/wxConfig'
import global from './modules/global'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    wxConfig,
    global
  },
  getters
})

export default store
