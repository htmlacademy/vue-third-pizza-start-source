import ingredientNames from "@/common/data/ingredients";

export const ingredientsMapForPreview = (pizza) => {
  const result = {};

  pizza?.ingredients?.forEach((ingredient) => {
    const id = ingredient.id;
    const name = ingredientNames[id];
    if (name) {
      result[name] = (result[name] || 0) + 1;
    }
  });

  return result;
};