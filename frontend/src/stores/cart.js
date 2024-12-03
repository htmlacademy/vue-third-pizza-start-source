import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const sum = ref(0);

  const additionalItems = ref([]);
  const pizzaList = ref([]);
  const address = reactive({
    street: "",
    house: "",
    apartment: "",
    comment: "",
  });
  const receiveType = ref(0);
  const phone = ref("");

  return {
    sum,
    additionalItems,
    pizzaList,
    receiveType,
    phone,
    address,
  };
});
