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

  function getPriceByDoughId(doughId) {
    return this.doughTypeList.find((item) => item.id === doughId)?.price || 0;
  }

  function getPriceBySauceId(sauceId) {
    return this.sauceList.find((item) => item.id === sauceId)?.price || 0;
  }

  function getMultiplierBySizeId(sizeId) {
    return this.doughSizeList.find((item) => item.id === sizeId)?.price || 1;
  }

  function getPriceByIngredientId(ingredientId) {
    return (
      this.ingredients.find((item) => item.id === ingredientId)?.multiplier || 0
    );
  }

  function getPriceByMiscId(miscId) {
    return this.misc.find((item) => item.id === miscId)?.price || 0;
  }

  return {
    ingredients,
    doughTypeList,
    sauceList,
    doughSizeList,
    misc,
    getPriceByDoughId,
    getPriceBySauceId,
    getMultiplierBySizeId,
    getPriceByIngredientId,
    getPriceByMiscId,
  };
});
