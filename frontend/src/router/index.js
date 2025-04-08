import { createRouter, createWebHistory } from 'vue-router'
import { middlewarePipeline } from "@/middlewares/middlewarePipeline";

import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Cart from '@/views/CartView.vue'
import Users from '@/views/UserView.vue'
import Orders from '@/views/OrdersView.vue'
import ProfileView from  '@/views/ProfileView.vue'
import Success from  '@/views/SuccessView.vue'
import { isLoggedIn } from "@/middlewares/isLoggedIn";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      name: "home",
      component: HomeView,
      meta: { layout: "DefaultLayout" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: "SimpleLayout" },
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: { layout: "DefaultLayout" },
    },
    {
      path: "/success",
      name: "success",
      component: Success,
      meta: { layout: "SimpleLayout" },
    },
    {
      path: "/user",
      name: "user",
      component: Users,
      meta: { 
        layout: "DefaultLayout",
        middlewares: [isLoggedIn],
      },
      children: [
        {
          path: "orders",
          name: "orders",
          component: Orders,
        },
        {
          path: "profile",
          name: "profile",
          component: ProfileView,
        },
      ],
    },

  ]
})

export default router;

middlewarePipeline(router);