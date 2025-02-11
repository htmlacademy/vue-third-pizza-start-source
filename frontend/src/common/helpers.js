import { useDataStore } from '@/store/useDataStore';

export const getImage = image => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../assets/img/${image}`, import.meta.url).href
}

export const getPizzaTotalPrice = (pizza) => {
  const data = useDataStore();

    const saucePrice = data.saucesList.find((s) => pizza.sauceId === s.id)?.price ?? 0;
    const doughPrice = data.doughList.find((d) => pizza.doughId === d.id)?.price ?? 0;
    const sizeMultiplier = data.sizesList.find((s) => pizza.sizeId === s.id)?.multiplier ?? 1;
    const getIngredientsPrice = () => {
      return pizza.ingredients.map((i) => {
        const price = data.ingredientsList.find((ing) => ing.id === i.id)?.price ?? 0;
        const total = price * i.quantity;
        return total;
      })
      .reduce((acc, cur) => acc + cur, 0);
    }

    return (saucePrice + doughPrice + getIngredientsPrice()) * pizza.quantity * sizeMultiplier;
}