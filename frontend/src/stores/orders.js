import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { useDataStore } from "./data";
import resources from "@/services/resources";
import { normalizeOrder } from "@/common/helpers/normalizeOrder";
import { buildOrderPayload } from "@/common/helpers/orderPayload";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
  }),

  actions: {
    async loadOrders() {
      const dataStore = useDataStore();

      // Загружаем справочники, если ещё не загрузили
      if (!dataStore.isDataLoaded) {
        await dataStore.loadData();
      }

      const res = await resources.order.getOrders();
      if (res.__state !== "success") {
        console.error("loadOrders error:", res.data);
        return;
      }

      const catalogs = {
        doughs: dataStore.doughs,
        sizes: dataStore.sizes,
        sauces: dataStore.sauces,
        ingredients: dataStore.ingredients,
        misc: dataStore.misc,
      };

      this.orders = res.data.map((raw) => normalizeOrder(raw, catalogs));
    },

    async addOrder(orderData) {
      const res = await resources.order.createOrder(orderData);

      if (res.__state === "success") {
        await this.loadOrders();
      }

      return res;
    },

    async submitCart(cartStore, authStore) {
      const payload = buildOrderPayload(cartStore, authStore);
      return this.addOrder(payload);
    },

    async deleteOrder(orderId) {
      const res = await resources.order.removeOrder(orderId);
      if (res.__state === "success") {
        this.orders = this.orders.filter((o) => o.id !== orderId);
      }
      return res;
    },

    repeatOrder(orderId) {
      const order = this.orders.find((o) => o.id === orderId);
      if (!order) return;

      const cart = useCartStore();
      cart.restoreOrder(order);
    },

    saveToLocalStorage() {
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
  },
});
