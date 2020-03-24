import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: (resolve) => require(['@/views/index'], resolve),
      children: [
        {
          path: '',
          meta: {
            name: '首页'
          },
          component: (resolve) => require(['@/views/homePage'], resolve),
        },
        {
          path: '/redirect/:path*',
          component: (resolve) => require(['@/views/redirect'], resolve),
        },
        ...staticRouter
      ],
    },
    {
      path: '/redirect/:path*',
      component: (resolve) => require(['@/views/redirect'], resolve),
    },
    {
      path: '/404',
      component: (resolve) => require(['@/views/errorPage/404'], resolve),
    },
    {
      path: '*',
      //redirect:'/404',
      component: (resolve) => require(['@/views/errorPage/404'], resolve),
    },
  ]
})
