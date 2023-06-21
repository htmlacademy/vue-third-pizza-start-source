import { ingredientsTypes } from "@/modules/constructor/constants";

export const normalizeIngredients = (ingredients) =>
  ingredients.map((ingredient) => ({
    ...ingredient,
    type: ingredientsTypes.find((type) => type.name === ingredient.name).value,
    count: 0,
    totalPrice: ingredient.price,
  }));
