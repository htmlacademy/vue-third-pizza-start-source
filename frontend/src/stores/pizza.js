import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { calculatePizzaPrice } from "@/common/helpers/pizza-price";

export const usePizzaStore = defineStore("pizza", () => {
  const id = ref(null);
  const name = ref(0);
  const doughId = ref(0);
  const sizeId = ref(0);
  const sauceId = ref(0);
  const ingredients = reactive([]);

  const sum = computed(() => {
    return calculatePizzaPrice({
      doughId: doughId.value,
      sizeId: sizeId.value,
      sauceId: sauceId.value,
      ingredients,
    });
  });

  const selectedIngredients = computed(() => {
    return ingredients.filter((ingredient) => ingredient.quantity > 0);
  });

  return {
    id,
    name,
    doughId,
    sizeId,
    sauceId,
    ingredients,
    sum,
    selectedIngredients,
  };
});
