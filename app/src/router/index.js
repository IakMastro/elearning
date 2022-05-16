import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/views/Courses.vue')
  },
  {
    path: '/courses/:id',
    name: 'course',
    component: () => import('@/views/Course.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/Login.vue')
  },

  // Otherwise, load to home
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const public_pages = ['/login', '/register']
  const auth_required = !public_pages.includes(to.path)
  const logged_in = localStorage.getItem('user')

  if (auth_required && !logged_in) {
    return next('/login')
  }

  next()
})

export default router
