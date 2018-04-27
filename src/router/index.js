import Vue from 'vue'
import Router from 'vue-router'

import helloworld from '../helloworld/routes'
import foods from '../foods/routes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/helloworld'
    },
    ...helloworld,
    ...foods
  ]
})
