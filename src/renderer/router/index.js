import Vue from 'vue'
import Router from 'vue-router'
import * as view from '../view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/master-password',
      name: 'master-password',
      component: view.masterPassword
    },
    {
      path: '/port-forwarding',
      name: 'port-forwarding',
      component: view.portForwarding
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
