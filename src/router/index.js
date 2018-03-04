import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: routers,
  mode: 'history'
})
