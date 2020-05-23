import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

// {
//   path: '/admin',
//   name: 'admin',
//   component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
//   children: [
//     {
//       path: '/admin/course/:name',
//       name: 'detail',
//       component: () => import('../views/Detail.vue')
//     },
//   ],
//   meta: {
//     auth: true
//   },
//   beforeEnter(to, from, next) {
//       // 是否登录
//       if (window.isLogin) {
//         next()
//       } else {
//         next('/login?redirect=' + to.fullPath)
//       }
//   }
// },

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/course/:name',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })


  // 全局守卫
  router.beforeEach((to, from, next) => {
      // 判断路由是否需要守卫
      // if (to.meta.auth) {
      //   // 是否登录
      //   if (window.isLogin) {
      //     next()
      //   } else {
      //     next('/login?redirect=' + to.fullPath)
      //   }
      // } else {
      //   next()
      // }
      console.log(1)
      if (store.state.user.isLogin) {
        if (to.path === '/login') {
          next('/')
        } else {
          next()
        }
      } else {
        if (to.path === '/login') {
          next()
        } else {
          next('/login?redirect=' + to.fullPath)
        }
      }
  })

  export default router
