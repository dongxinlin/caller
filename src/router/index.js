import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'colorBl',
  routes: [
    /* 定向页面 */
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: '404page',
      component: () => import('@/views/404/404'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('@/views/author'),
      meta: {
        title: '授权'
      }
    },
    /* 一级页面 */
    {
      path: '/home',
      name: 'home',
      redirect:'/home/whole',
      component: () => import('@/views/home'),
      meta: { title: '主页' },
      children :[
        {
          path:'whole',
          name: 'whole',
          component: () => import('@/views/home/whole'),
          meta: { title: '新增预约' }
        },
        {
          path:'subscribe',
          name: 'subscribe',
          component: () => import('@/views/home/subscribe'),
          meta: { title: '全部预约' }
        },
        {
          path:'personage',
          name: 'personage',
          component: () => import('@/views/home/personage'),
          meta: { title: '我的' }
        },
        
      ]
    },
    // 二级页面
    {
      path: '/data',
      name: 'data',
      component: () => import('@/views/data'),
      meta: { title: '工作' },
      children:[
        {
          path:'accompanying',
          name: 'accompanying',
          component: () => import('@/views/data/accompanying'),
          meta: { title: '选择陪同人' }
        },
        {
          path:'newly',
          name: 'newly',
          component: () => import('@/views/data/newly'),
          meta: { title: '新增陪同人' }
        },
      ]
    }
  ],

})

export default router
