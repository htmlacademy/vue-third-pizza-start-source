import { useDataStore } from "@/stores/data";

export function calculatePizzaPrice(pizza) {
  const dataStore = useDataStore();
  const sizeMultiplier = dataStore.getMultiplierBySizeId(pizza.sizeId);
  const doughPrice = dataStore.getPriceByDoughId(pizza.doughId);
  const saucePrice = dataStore.getPriceBySauceId(pizza.sauceId);

  const ingredientsPrice = pizza.ingredients
    .filter((item) => item.quantity > 0)
    .reduce((acc, item) => {
      return (
        acc +
        dataStore.getPriceByIngredientId(item.ingredientId) * item.quantity
      );
    }, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
}
