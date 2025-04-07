import { useAuthStore } from "@/stores/auth";

export const isLoggedIn = ({ to }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return { path: "/login", query: { redirect: to.fullPath } };
  } else {
    return true;
  }
};