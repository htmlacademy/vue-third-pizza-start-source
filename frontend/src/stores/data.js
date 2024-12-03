import { defineStore } from "pinia";
import { reactive } from "vue";

/**  Доступные типы теста, размеры, ингредиенты и соусы. */
export const useDataStore = defineStore("data", () => {
  const ingredients = reactive([]);
  const doughTypeList = reactive([]);
  const sauceList = reactive([]);
  const doughSizeList = reactive([]);

  return {
    ingredients,
    doughTypeList,
    sauceList,
    doughSizeList,
  };
});
