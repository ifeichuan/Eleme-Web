import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/tabs/home/homeView.vue';
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('@/views/tabs/tabsView.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/tabs/home/homeView.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/tabs/order/orderView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('@/views/tabs/me/meView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/shop/:id',
        name: 'shop',
        component: () => import('@/views/shop/shopView.vue'),
      },

    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/loginView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export const preLoading = <T extends RouteRecordRaw>(routes: T[]) => {
  return new Promise((resolve) => {
    const preloadTasks = []
    const visited = new Set()

    function processRoute(route: T, pre: string = "") {
      if (visited.has(route.path)) return;
      visited.add(route.path)

      // 跳过重定向路由
      if (route.redirect) return;

      // 处理路径
      const pathSegments = route.path.split('/').filter(Boolean);
      const viewName = pathSegments[pathSegments.length - 1] || '';

      if (!viewName) return;

      const viewPath = pre
        ? `/src/views${pre}/${viewName}/${viewName}View.vue`
        : `/src/views/${viewName}/${viewName}View.vue`;

      preloadTasks.push(requestIdleCallback(() => {
        try {
          import(`${viewPath}`).then((module) => {
            console.log(`加载成功: ${viewPath}`)
          }).catch((error) => {
            console.warn(`预加载失败: ${viewPath}`, error)
          })
        }
        catch (error) {
          console.warn(`预加载失败: ${viewPath}`, error)
        }
      }))

      if (route.children && route.children.length > 0) {
        route.children.forEach(child => processRoute(child, pre ? `${pre}/${viewName}` : `/${viewName}`))
      }
    }

    routes.forEach(route => processRoute(route))
    Promise.all(preloadTasks).then(resolve).catch((e) => {
      console.log('预加载任务出错:', e)
    })
  })
}

// HomeView.mounted = () => {
//   new Promise((res) => {
//     setTimeout(() => {
//       res(0)
//     }, 3000);
//   }).then(() => {
//     preLoading(routes)
//   })
// }
router.beforeEach((to, from) => {
  console.log(to.fullPath)
  return true
  // if (to.meta.requiresAuth) {
  //   if (checkLogin()) {
  //     return true
  //   }
  //   router.push({
  //     name: 'login'
  //   })
  // }
  // else {
  //   return true
  // }
})

export default router;
