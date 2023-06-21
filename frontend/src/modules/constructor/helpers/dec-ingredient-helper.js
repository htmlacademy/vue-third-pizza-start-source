export const decIngredientHelper = (decEvt, ingredients) => {
  let res = [...ingredients];
  const idx = res.findIndex(({ id }) => id === decEvt.ingredient.id);

  if (decEvt.count < 1) {
    res = res.filter(({ id }) => id !== decEvt.ingredient.id);

    return res;
  }

  res[idx] = {
    ...res[idx],
    count: decEvt.count,
    totalPrice: res[idx].price * decEvt.count,
  };

  return res;
};
