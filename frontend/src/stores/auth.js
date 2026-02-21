import { defineStore } from "pinia";
import { useProfileStore } from "./profile";
import { useOrdersStore } from "./orders";
import JwtService from "@/services/jwt/jwt.service";
import resources from "@/services/resources";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },

  actions: {
    setUser(user) {
      this.user = user;
    },

    setError(error) {
      this.error = error;
    },

    async login(credentials) {
      this.isLoading = true;
      this.error = null;

      const res = await resources.auth.login(credentials);
      this.isLoading = false;

      if (res.__state === "success") {
        const token = res.data.token;
        JwtService.saveToken(token);
        resources.auth.setAuthHeader(token);
        await this.whoami();
        return "success";
      } else {
        this.error = res.data.message;
        return res.data.message;
      }
    },

    async logout() {
      await resources.auth.logout();
      JwtService.destroyToken();
      resources.auth.setAuthHeader("");
      this.user = null;
      try {
        const profileStore = useProfileStore();
        const ordersStore = useOrdersStore();
        profileStore.addresses = [];
        ordersStore.orders = [];
        profileStore.saveToLocalStorage?.();
        ordersStore.saveToLocalStorage?.();
      } catch (e) {
        console.log("error", e);
      }
    },

    /** Получить информацию о пользователе */
    async fetchUser() {
      const token = JwtService.getToken();
      resources.auth.setAuthHeader(token);

      const res = await resources.auth.whoami();
      if (res.__state !== "success") {
        throw new Error("Не удалось получить профиль пользователя");
      }
      this.setUser(res.data);
    },

    /** Параллельно загрузить адреса и заказы */
    async fetchProfileData() {
      const profileStore = useProfileStore();
      const ordersStore = useOrdersStore();

      const [addrRes, ordersRes] = await Promise.all([
        resources.address.getAddresses(),
        resources.order.getOrders(),
      ]);

      if (addrRes.__state !== "success") {
        throw new Error("Не удалось загрузить адреса");
      }
      if (ordersRes.__state !== "success") {
        throw new Error("Не удалось загрузить заказы");
      }

      // Сохраняем в профиль-стор
      profileStore.setAddresses(addrRes.data);

      // Сохраняем в orders-стор
      ordersStore.orders = ordersRes.data;
      ordersStore.saveToLocalStorage();
    },

    /** Инициализация сессии: получить профиль и связанные данные */
    async whoami() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.fetchUser();
        await this.fetchProfileData();
      } catch (e) {
        console.error("Error in authStore.whoami:", e);
        await this.logout();
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
