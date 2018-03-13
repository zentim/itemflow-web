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
    component: () => import('@/components/User/Profile')
  },
  {
    path: '/item/new',
    name: 'CreateItem',
    component: () => import('@/components/Shared/CreateItemFlow')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import('@/components/Home')
  },
  {
    path: '/item/:id',
    name: 'Item',
    props: true,
    component: () => import('@/components/Item/Item')
  },
  {
    path: '/flow/new',
    name: 'CreateFlow',
    component: () => import('@/components/Shared/CreateItemFlow')
  },
  {
    path: '/flows',
    name: 'Flows',
    component: () => import('@/components/Home')
  },
  {
    path: '/flow/:id',
    name: 'Flow',
    props: true,
    component: () => import('@/components/Flow/Flow')
  }
]

// 所有上面定義的路由都要寫在下面的 routers 裡
export const routers = [
  signupRouter,
  loginRouter,
  ...appRouter
]
