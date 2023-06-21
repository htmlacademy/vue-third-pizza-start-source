export const getTotalPriceResult = (pizza) =>
  (pizza.ingredients
    .map(({ totalPrice }) => totalPrice)
    .reduce((a, b) => a + b) +
    pizza.dough.price +
    pizza.sauce.price) *
  pizza.size.multiplier;
