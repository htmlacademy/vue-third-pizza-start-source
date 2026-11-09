const ingredients = {
  1: "mushrooms",
  2: "cheddar",
  3: "salami",
  4: "ham",
  5: "ananas",
  6: "bacon",
  7: "onion",
  8: "chile",
  9: "jalapeno",
  10: "olives",
  11: "tomatoes",
  12: "salmon",
  13: "mozzarella",
  14: "parmesan",
  15: "blue_cheese",
} as const;

export type IngredientName = (typeof ingredients)[keyof typeof ingredients];

const ingredientsById: Readonly<Record<number, IngredientName>> = ingredients;

export default ingredientsById;
