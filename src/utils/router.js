import { createRouter, createWebHistory } from "vue-router"
import live from "../pages/live.vue"

import live_child_live from "../components/live.vue"
import live_child_paint from "../components/paint.vue"

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/live',
    name: 'live',
    component: live,
    children: [
      {
        path:'live',
        component: live_child_live
      },
      {
        path:'paint',
        component: live_child_paint
      },
      {
        path: 'chat',
        component: import('../components/live.vue')
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../view/about.vue')
  // }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
