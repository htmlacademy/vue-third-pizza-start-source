import { useAuthStore } from "@/stores/auth";

export const isLoggedIn = ({ to }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    /* Сохраняем маршрут, по которому пользователь намеревался перейти,
     * чтобы перенаправить на него пользователя после успешной авторизации
     */
    return { path: "/login", query: { redirect: to.fullPath } };
  } else {
    return true;
  }
};
