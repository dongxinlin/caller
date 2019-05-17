import router from '@/router'
import store from '@/store'
import tool from '@/utils/tool'

const whiteList = ['/author', '/404']

router.beforeEach((to, from, next) => {
  if (tool.localGet('token')) {
    if (to.path === '/author') {
      next({ path: '/' })
    } else {
      if (!store.getters.userInfo) {
        store.dispatch('GetInfo').then(res => {
          next()
        }).catch(err => {
          console.log(err)
          store.dispatch('FedLogOut').then(() => {
            next(`/author?redirect=${to.path}`)
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/author?redirect=${to.path}`)
    }
  }
})

router.afterEach((to, from, next) => {

})
