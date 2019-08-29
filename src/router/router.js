// 登入頁面
export const signinRouter = {
  path: '/signin',
  name: 'Signin',
  component: () => import('@/pages/User/Signin')
}

// Main
export const appRouter = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('@/pages/CreateItemFlow')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/pages/Home')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/User/Profile')
  },
  {
    path: '/trash',
    name: 'Trash',
    component: () => import('@/pages/Home')
  },
  {
    path: '/:id',
    name: 'Itemflow',
    props: true,
    component: () => import('@/pages/ItemFlow')
  }
]

// 所有上面定義的路由都要寫在下面的 routers 裡
export const routers = [
  signinRouter,
  ...appRouter
]
