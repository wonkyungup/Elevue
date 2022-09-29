import Vue from 'vue'
import Router from 'vue-router'
import * as view from '../view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main-port-forwarding',
      name: 'main-port-forwarding',
      component: view.mainPortForwarding
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
