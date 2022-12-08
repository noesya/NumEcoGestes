import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu',
      name: 'menu',
      // route level code-splitting
      // this generates a separate chunk (Menu.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MenuView.vue')
    },
    {
        path: "/suivi",
        name: "suivi",
        component: () => import('../views/SuiviView.vue')
    },
    {
        path: "/ecogestes",
        name: "ecogestes",
        component: () => import('../views/EcogestesView.vue')
    }
  ]
})

export default router
