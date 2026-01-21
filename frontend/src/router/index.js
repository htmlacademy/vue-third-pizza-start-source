import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import { navguard } from "@/navigationguards/navguard";

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

navguard(router);