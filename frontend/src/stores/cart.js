import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "@/stores/data";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";

export const useCartStore = defineStore("cart", () => {
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
  const dataStore = useDataStore();

  const pizzaPrice = computed(() => {
    return pizzaList.value.reduce((total, pizza) => {
      return total + calculatePizzaPrice(pizza, dataStore) * pizza.quantity;
    }, 0);
  });

  const miscPrice = computed(() => {
    return additionalItems.value
      .filter((misc) => misc.quantity > 0)
      .reduce((mSum, misc) => {
        return mSum + dataStore.getPriceByMiscId(misc.id) * misc.quantity;
      }, 0);
  });

  const sum = computed(() => {
    return pizzaPrice.value + miscPrice.value;
  });

  return {
    sum,
    pizzaPrice,
    miscPrice,
    additionalItems,
    pizzaList,
    receiveType,
    phone,
    address,
  };
});
