import Vue from 'vue'
import Router from 'vue-router'
import { sameple } from '../components/Screen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sameple',
      component: sameple
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
