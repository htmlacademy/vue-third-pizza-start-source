import { defineStore } from "pinia";
import doughs from "@/mocks/dough.json";
import ingredientsData from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import miscData from "@/mocks/misc.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

/**  Доступные типы теста, размеры, ингредиенты и соусы. */
export const useDataStore = defineStore("data", () => {
  const ingredients = ingredientsData.map(normalizeIngredients);
  const doughTypeList = doughs.map(normalizeDough);
  const sauceList = sauces.map(normalizeSauces);
  const doughSizeList = sizes.map(normalizeSize);
  const misc = miscData;

  return {
    ingredients,
    doughTypeList,
    sauceList,
    doughSizeList,
    misc,
  };
});
