import tool from '@/utils/tool'
import router from '@/router'
import { login, getInfo, logout } from '@/api/login'

const user = {
  state: {
    token: tool.localGet('token'),
    userInfo: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    /* 登录 */
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          const { data } = res
          tool.localSet('token', data.token)
          commit('SET_TOKEN', data.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 获取用户信息 */
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const { data } = res
          commit('SET_USERINFO', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 登出 */
    LogOut() {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          tool.localClear()
          router.push('/login')
          setTimeout(() => location.reload(), 50)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 前端登出 */
    FedLogOut() {
      return new Promise(resolve => {
        tool.localClear()
        location.reload()
        resolve()
      })
    }
  }
}

export default user
