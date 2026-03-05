import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuth'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { guestOnly: true },
    },
  ],
})

router.beforeEach((to) => {
  const { authenticatedUser } = useAuthStore()
  const isAuthenticated = !!authenticatedUser

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'register' }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
