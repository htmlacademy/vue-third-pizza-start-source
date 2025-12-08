import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores";

import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import CartView from "@/views/CartView.vue";
import OrdersView from "@/views/OrdersView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "signup",
          name: "signup",
          component: SignupView,
        },
      ],
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "cart",
          name: "cart", 
          component: CartView,
        },
      ],
    },
    {
      path: "/profile",
      component: UserLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "orders",
          name: "orders",
          component: OrdersView,
          meta: { requiresAuth: true },
        },
        {
          path: "data",
          name: "profile",
          component: ProfileView,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      redirect: "/auth/login",
    },
    {
      path: "/signup",
      redirect: "/auth/signup",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && !authStore.user) {
    await authStore.checkAuth();
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: "login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
