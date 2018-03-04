import AuthGuard from './auth-guard'

// 登陸頁面
export const signupRouter = {
  path: '/signup',
  name: 'Signup',
  component: () => import('@/components/User/Signup')
}

export const loginRouter = {
  path: '/login',
  name: 'Login',
  component: () => import('@/components/User/Login')
}

// Main
export const appRouter = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/User/Profile'),
    beforeEnter: AuthGuard
  },
  {
    path: '/item/new',
    name: 'CreateItem',
    component: () => import('@/components/Item/CreateItem'),
    beforeEnter: AuthGuard
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import('@/components/Item/Items'),
    beforeEnter: AuthGuard
  },
  {
    path: '/items/:id',
    name: 'Item',
    props: true,
    component: () => import('@/components/Item/Item'),
    beforeEnter: AuthGuard
  },
  {
    path: '/flow/new',
    name: 'CreateFlow',
    component: () => import('@/components/Flow/CreateFlow'),
    beforeEnter: AuthGuard
  },
  {
    path: '/flows',
    name: 'Flows',
    component: () => import('@/components/Flow/Flows'),
    beforeEnter: AuthGuard
  },
  {
    path: '/flows/:id',
    name: 'Flow',
    props: true,
    component: () => import('@/components/Flow/Flow'),
    beforeEnter: AuthGuard
  }
]

// 所有上面定義的路由都要寫在下面的 routers 裡
export const routers = [
  signupRouter,
  loginRouter,
  ...appRouter
]
