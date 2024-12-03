export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutUser" },
  },
  {
    path: "/basket",
    name: "BasketView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutUser" },
  },
  {
    path: "/popup",
    name: "PopupView",
    component: () => import("../views/PopupView.vue"),
  },
  {
    path: "/auth",
    name: "AuthView",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/user",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
    meta: { layout: "AppLayoutUser" },
    children: [
      {
        path: "orders",
        name: "OrdersView",
        component: () => import("../views/OrdersView.vue"),
      },
      {
        path: "profile",
        name: "ProfileView",
        component: () => import("../views/ProfileView.vue"),
      },
    ],
  },
];
