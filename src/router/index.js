import { createWebHistory, createRouter } from 'vue-router';

import Register from '../views/Register.vue';
import { components } from 'vuetify/dist/vuetify-labs.js';

const routes = [
  { path: '/register', name: "Register", component: Register },
  { path: '/home', name: "HomeViews", component: () => import("../views/HomeView.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
  { path: "/login", name: "Login", component: () => import("../views/Login.vue") },
  { path: "/films", name: "Films", component: ()=> import("../views/Films.vue") },
  { path: "/", name: "Index", component: () => import("../components/HelloWorld.vue")}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('username'); 
  

  if (to.name === 'Index') {
    localStorage.removeItem('username'); 
  }


  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
      next({ name: 'Index' }); 
  } else {
      next(); 
  }
});

export default router;
