import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePizzaStore = defineStore("pizza", () => {
  const name = ref(0);
  const dough = ref("");
  const size = ref("");
  const sauce = ref("");
  const ingredients = reactive([]);

  return {
    name,
    dough,
    size,
    sauce,
    ingredients,
  };
});
