import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/User/Login'
import Signup from '@/components/User/Signup'
import Profile from '@/components/User/Profile'
import Items from '@/components/Item/Items'
import Item from '@/components/Item/Item'
import CreateItem from '@/components/Item/CreateItem'
import Flows from '@/components/Flow/Flows'
import Flow from '@/components/Flow/Flow'
import CreateFlow from '@/components/Flow/CreateFlow'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/item/new',
      name: 'CreateItem',
      component: CreateItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
      beforeEnter: AuthGuard
    },
    {
      path: '/items/:id',
      name: 'Item',
      props: true,
      component: Item,
      beforeEnter: AuthGuard
    },
    {
      path: '/flow/new',
      name: 'CreateFlow',
      component: CreateFlow,
      beforeEnter: AuthGuard
    },
    {
      path: '/flows',
      name: 'Flows',
      component: Flows,
      beforeEnter: AuthGuard
    },
    {
      path: '/flows/:id',
      name: 'Flow',
      props: true,
      component: Flow,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
