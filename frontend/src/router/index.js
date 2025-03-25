import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Card from '@/views/CardView.vue'
import User from '@/views/UserView.vue'
import Users from '@/views/UserView.vue'
import UserOrder from '@/views/OrderView.vue'
import UserProfile from  '@/views/UserView.vue'




const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
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
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/user/:id',
      name: 'Users',
      component: Users,
      children: [
        {
          path: 'profile',
          name: UserProfile,
          component: UserProfile,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'UserOrder',
          component: UserOrder,
          meta: { requiresAuth: true }
        }
      ]
    }

  ]
})

export default router;
