import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Card from '@/views/CardView.vue'
import User from '@/views/UserView.vue'
import OrderUsers from '@/views/OrderView.vue' 




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
      path: '/order/:id', 
      name: 'OrderUsers',
      component: OrderUsers 
    }
  
  ]
})

export default router;
