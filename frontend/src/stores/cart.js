import { defineStore } from "pinia";
import { usePizzaStore } from "@/stores/pizza";
import { useDataStore } from "@/stores/data";
import { useProfileStore } from "@/stores/profile";
import { toRaw } from "vue";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    deliveryType: "pickup",
    address: {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),

  actions: {
    addPizza() {
      const pizzaStore = usePizzaStore();

      // Преобразование формата ингредиентов
      const formattedIngredients = Object.values(pizzaStore.ingredients)
        .filter((item) => item.count > 0)
        .map(({ ingredient, count }) => ({
          ...ingredient,
          quantity: count,
        }));

      this.pizzas.push({
        id: Date.now(),
        ...pizzaStore.$state,
        ingredients: formattedIngredients,
        totalPrice: pizzaStore.totalPrice,
        quantity: 1,
      });

      pizzaStore.$reset();
    },

    editPizza(pizzaId) {
      const pizza = this.pizzas.find((p) => p.id === pizzaId);
      if (!pizza) return;

      const pizzaStore = usePizzaStore();

      // Восстанавливаем состояние конструктора
      pizzaStore.$patch({
        ...pizza,
        ingredients: this.convertToIngredientsObject(pizza.ingredients),
      });

      // Удаляем пиццу из корзины
      this.pizzas = this.pizzas.filter((p) => p.id !== pizzaId);
    },

    restoreOrder(order) {
      const profileStore = useProfileStore();

      this.$reset();

      this.pizzas = order.pizzas.map((p) => ({ ...p }));
      this.misc = order.misc.map((m) => ({ ...m }));
      this.phone = order.phone || "";

      if (!order.address) {
        this.deliveryType = "pickup";
        this.address = {
          id: null,
          name: "",
          street: "",
          building: "",
          flat: "",
          comment: "",
        };
        return;
      }

      const addrId = Number(order.address.id);

      // Пытаемся найти адрес среди сохранённых
      const saved = profileStore.addresses.find((a) => Number(a.id) === addrId);

      console.log("addrId", addrId);
      console.log("saved", saved);
      console.log("profileStore.addresses", toRaw(profileStore.addresses));

      if (saved) {
        this.deliveryType = "existing";
        this.address = { ...saved };
      } else {
        this.deliveryType = "new";
        this.address = {
          id: null,
          name: order.address.name || "",
          street: order.address.street || "",
          building: order.address.building || "",
          flat: order.address.flat || "",
          comment: order.address.comment || "",
        };
      }
    },

    convertToIngredientsObject(ingredientsArray) {
      return ingredientsArray.reduce((acc, item) => {
        acc[item.id] = { ingredient: item, count: item.quantity };
        return acc;
      }, {});
    },

    updateMisc(itemId, quantity) {
      const item = this.misc.find((m) => m.id === itemId);
      if (item) {
        item.quantity = Math.max(0, quantity);
      } else {
        this.misc.push({
          id: itemId,
          quantity: 1,
          ...this.getMiscItem(itemId),
        });
      }
    },

    updatePizzaQuantity(pizzaId, newQuantity) {
      const pizzaIndex = this.pizzas.findIndex((p) => p.id === pizzaId);
      if (pizzaIndex === -1) return;

      if (newQuantity <= 0) {
        this.pizzas.splice(pizzaIndex, 1);
      } else {
        this.pizzas[pizzaIndex].quantity = newQuantity;
      }
    },

    getMiscItem(itemId) {
      return useDataStore().misc.find((m) => m.id === itemId);
    },
  },

  getters: {
    total: (state) => {
      const pizzasSum = state.pizzas.reduce(
        (sum, pizza) => sum + pizza.totalPrice * pizza.quantity,
        0,
      );

      const miscSum = state.misc.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return pizzasSum + miscSum;
    },
  },
});
