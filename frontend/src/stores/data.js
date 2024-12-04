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
    return this.doughTypeList.find((item) => item.id === doughId) || null;
  }

  function getSauceById(sauceId) {
    return this.sauceList.find((item) => item.id === sauceId) || null;
  }

  function getSizeById(sizeId) {
    return this.doughSizeList.find((item) => item.id === sizeId) || null;
  }

  function getIngredientById(ingredientId) {
    return this.ingredients.find((item) => item.id === ingredientId) || null;
  }

  function getMiscById(miscId) {
    return this.misc.find((item) => item.id === miscId) || null;
  }

  return {
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
