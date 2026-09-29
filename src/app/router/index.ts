import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/HomePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found/NotFoundPage.vue'),
    },
  ],

  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
