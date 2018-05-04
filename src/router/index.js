import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/module/HelloWorld'
import Login from '@/module/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    }
  ]
})
