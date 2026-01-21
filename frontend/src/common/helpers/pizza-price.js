import { useDataStore } from "@/stores/data";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";

export const pizzaPrice = (pizza) => {
  const data = useDataStore();
  const ingredients = ingredientsQuantity(pizza);

  const sizeMultiplier =
    data.sizes.find((item) => item.id === pizza.sizeId)?.multiplier ?? 1;

  const doughPrice =
    data.doughs.find((item) => item.id === pizza.doughId)?.price ?? 0;

  const saucePrice =
    data.sauces.find((item) => item.id === pizza.sauceId)?.price ?? 0;


  const ingredientsPrice = data.ingredients
    .map((item) => ingredients[item.id] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};