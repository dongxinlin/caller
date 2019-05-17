import Vue from 'vue'
import Router from 'vue-router'
import tool from '@/utils/common';

import accreditation from '@/components/accreditation'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/author',
    //   name: 'author',
    //   meta: { title: '授权' },
    //   component: () => import('@/components/author.vue')
    // },
    {
      path: '/',
      name: 'consult',
      meta: { title: '法律咨询' },
      redirect: '/consultNow',
      component: () => import('@/components/consult'),
      children: [
        {
          path: '/consultNow',
          name: 'consultNow',
          component: () => import('@/components/consultNow'),
          meta: { title: '法律咨询', index: 1 }
        },
        {
          path: '/myConsult',
          name: 'myConsult',
          meta: { title: '法律咨询', index: 2 },
          component: () => import('@/components/myConsult'),
        }
      ]
    },
    {
      path: '/complain',
      name: 'complain',
      redirect: '/complainNow',
      meta: { title: '举报投诉' },
      component: () => import('@/components/complain'),
      children: [
        {
          path: '/complainNow',
          name: 'complainNow',
          meta: { title: '举报投诉', index: 1 },
          component: () => import('@/components/complainNow'),
        },
        {
          path: '/myComplain',
          name: 'myComplain',
          meta: { title: '举报投诉', index: 2 },
          component: () => import('@/components/myComplain'),
        }
      ]
    },
    {
      path: '/accreditation',
      name: 'accreditation',
      meta: { title: '办证查询' },
      component: accreditation
    },
    {
      path: '/appoint',
      name: 'appoint',
      redirect: '/appointNow',
      meta: { title: '案件预约' },
      component: () => import('@/components/appoint'),
      children: [
        {
          path: '/appointNow',
          name: 'appointNow',
          meta: { title: '案件预约', index: 1 },
          component: () => import('@/components/appointNow'),
        },
        {
          path: '/myAppoint',
          name: 'myAppoint',
          meta: { title: '案件预约', index: 2 },
          component: () => import('@/components/myAppoint'),
        }
      ]
    }
  ]
})

const whiteList = ['author'];
router.beforeEach((to, from, next) => {
  var _userInfo = tool.localGet('userWx')
  _userInfo == 'undefine' && localStorage.removeItem('userWx')
  if (_userInfo && _userInfo != null) next()
  else {
    if (to.name == 'author') next()
    else {
      next({
        path: '/author',
        query: { redirect: to.fullPath }
      })
    }
  }
})

export default router
