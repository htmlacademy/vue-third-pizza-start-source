export const incIngredientHelper = (incEvt, ingredients) => {
  if (incEvt.count > 3) {
    return ingredients;
  }

  let res = [...ingredients];
  const hasDuplicates = res.some(({ id }) => id === incEvt.ingredient.id);

  if (hasDuplicates) {
    const idx = res.findIndex(({ id }) => id === incEvt.ingredient.id);

    res[idx] = {
      ...res[idx],
      count: incEvt.count,
      totalPrice: res[idx].price * incEvt.count,
    };

    return res;
  }

  res = [
    ...ingredients,
    {
      ...incEvt.ingredient,
      count: incEvt.count,
      totalPrice: incEvt.ingredient.price * incEvt.count,
    },
  ];

  return res;
};
