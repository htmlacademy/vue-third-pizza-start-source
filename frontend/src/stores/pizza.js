import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePizzaStore = defineStore("pizza", () => {
  const id = ref(null);
  const name = ref(0);
  const doughId = ref(0);
  const sizeId = ref(0);
  const sauceId = ref(0);
  const ingredients = reactive([]);

  return {
    id,
    name,
    doughId,
    sizeId,
    sauceId,
    ingredients,
  };
});
