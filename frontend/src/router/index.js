import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'Home', 
      meta: { layout: 'AppLayout' },
      component: () => import('@/views/HomeView.vue') 
    },
    { path: '/cart',
      name: 'Cart', 
      meta: { layout: 'AppLayout' },
      component: () => import('@/views/CartView.vue') 
    },
    { path: '/login',
      name: 'Login', 
      // meta: { layout: 'AppLayout' },
      component: () => import('@/views/LoginView.vue') 
    },
    { path: '/user',
      name: 'User', 
      meta: { layout: 'AppLayout' },
      component: () => import('@/views/UserView.vue'),
      redirect: {
        name: "Profile",
      },
      children: [
        {
          path: "orders",
          name: "Orders",
          component: () => import("@/views/OrdersView.vue"),
        },
        {
          path: "",
          name: "Profile",
          component: () => import("@/views/ProfileView.vue"),
        },
      ],
    },
    { path: '/:pathMatch(.*)',
      name: 'Error', 
      component: () => import('@/views/ErrorView.vue') 
    },
  ]
});

export default router;
