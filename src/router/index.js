import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Osint.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Osint',
      component: HomeView
    },
    {
      path: '/Blockchain',
      name: 'Blockchain',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Blockchain.vue')
    }
  ]
})

export default router
