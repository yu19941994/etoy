import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: 'Home',
    component: () => import('../views/front/Home.vue'),
  },
  {
    path: '/',
    // name: 'Front',
    component: () => import('../views/Front.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/Home.vue'),
      },
      {
        path: 'customerorders',
        name: 'CustomerOrders',
        component: () => import('../views/front/CustomerOrders.vue'),
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import('../views/front/Ticket.vue'),
      },
      {
        path: 'productintroduce/:id',
        name: 'ProductIntroduce',
        component: () => import('../views/front/ProductIntroduce.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/front/Checkout.vue'),
      },
      {
        path: 'pay/:orderId',
        name: 'Pay',
        component: () => import('../views/front/Pay.vue'),
      }
    ]
  },

  
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/front/Login.vue'),
  },
  {
    path: '/admin',
    // name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        meta: { requiresAuth: true },
        component: () => import('../views/back/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        meta: { requiresAuth: true },
        component: () => import('../views/back/Orders.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        meta: { requiresAuth: true },
        component: () => import('../views/back/Coupons.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
