import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const sum = ref(0);

  const additionalItems = ref([]);
  const pizzaList = ref([]);
  const receiveType = ref(0);
  const phone = ref("");
  const street = ref("");
  const house = ref("");

  return {
    sum,
    additionalItems,
    pizzaList,
    receiveType,
    phone,
    street,
    house,
  };
});
