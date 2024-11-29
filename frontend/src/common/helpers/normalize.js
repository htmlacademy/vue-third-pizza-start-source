import doughSizes from "@/common/enum/doughSizes";
import ingredients from "@/common/enum/ingredients";
import sauces from "@/common/enum/sauces";
import sizes from "@/common/enum/sizes";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughSizes[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    value: ingredients[ingredient.id],
    count: 0,
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    value: sauces[sauce.id],
  };
};
