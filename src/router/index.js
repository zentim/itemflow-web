import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
import { store } from '../store/'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routers,
  mode: 'history'
})

// auth-guard
router.beforeEach((to, from, next) => {
  if (!store.getters.user && to.name !== 'Signin' && to.name !== 'Home') {
    next({
      name: 'Signin'
    })
  } else {
    next()
  }
})

export default router
