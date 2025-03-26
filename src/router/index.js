import { createWebHistory, createRouter } from 'vue-router'

import Register from '../views/Register.vue'

const routes = [
  { path: '/register', name: "Register", component: Register },
  { path: '/home', name: "HomeViews", component: () => import("../views/HomeView.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
  { path: "/", name: "Login", component: () => import("../views/Login.vue") }
]

const router = createRouter({
  history: createWebHistory(), 
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('username'); // Check if the user is logged in
  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
      next({ name: 'Login' }); // Redirect to login if not authenticated
  } else {
      next(); // Allow navigation
  }
});

export default router;