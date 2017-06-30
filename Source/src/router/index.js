import Vue from 'vue'
import Router from 'vue-router'
import dbSource from '@/components/dbSource'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dbSource',
      component: dbSource
    }
  ]
})
