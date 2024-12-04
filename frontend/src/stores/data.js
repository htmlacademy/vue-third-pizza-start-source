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
import { shallowRef } from "vue";

/**  Доступные типы теста, размеры, ингредиенты и соусы. */
export const useDataStore = defineStore("data", () => {
  const ingredients = shallowRef([]);
  const doughTypeList = shallowRef([]);
  const sauceList = shallowRef([]);
  const doughSizeList = shallowRef([]);
  const misc = shallowRef([]);

  function init() {
    ingredients.value = ingredientsData.map(normalizeIngredients);
    doughTypeList.value = doughs.map(normalizeDough);
    sauceList.value = sauces.map(normalizeSauces);
    doughSizeList.value = sizes.map(normalizeSize);
    misc.value = miscData;
  }

  function getPriceByDoughId(doughId) {
    return getDoughById(doughId)?.price || 0;
  }

  function getPriceBySauceId(sauceId) {
    return getSauceById(sauceId)?.price || 0;
  }

  function getMultiplierBySizeId(sizeId) {
    return getSizeById(sizeId)?.multiplier || 1;
  }

  function getPriceByIngredientId(ingredientId) {
    return getIngredientById(ingredientId)?.price || 0;
  }

  function getPriceByMiscId(miscId) {
    return getMiscById(miscId)?.price || 0;
  }

  function getDoughById(doughId) {
    return doughTypeList.value.find((item) => item.id === doughId) || null;
  }

  function getSauceById(sauceId) {
    return sauceList.value.find((item) => item.id === sauceId) || null;
  }

  function getSizeById(sizeId) {
    return doughSizeList.value.find((item) => item.id === sizeId) || null;
  }

  function getIngredientById(ingredientId) {
    return ingredients.value.find((item) => item.id === ingredientId) || null;
  }

  function getMiscById(miscId) {
    return misc.value.find((item) => item.id === miscId) || null;
  }

  return {
    init,
    ingredients,
    doughTypeList,
    sauceList,
    doughSizeList,
    misc,
    getDoughById,
    getSauceById,
    getSizeById,
    getIngredientById,
    getMiscById,
    getPriceByDoughId,
    getPriceBySauceId,
    getMultiplierBySizeId,
    getPriceByIngredientId,
    getPriceByMiscId,
  };
});
