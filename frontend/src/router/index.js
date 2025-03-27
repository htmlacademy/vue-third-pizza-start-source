import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Card from '@/views/CardView.vue'
import Users from '@/views/UserView.vue'
import UserOrder from '@/views/OrderView.vue'
import ProfileView from  '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { 
        layout: "DefaultLayout" 
      },
    }
    ,
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/user/',
      name: 'User',
      component: Users,
      children: [
        {
          path: 'orders',
          name: 'UserOrder',
          component: UserOrder,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          name: 'ProfileView',
          component: ProfileView,
          meta: { requiresAuth: true }
        }
      ]
    }

  ]
})

export default router;
