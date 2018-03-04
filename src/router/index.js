import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './router'

Vue.use(Router)

const routes = routers

export default new Router({
  routes,
  mode: 'history'
})
