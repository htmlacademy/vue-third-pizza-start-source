export function buildOrderPayload(cart, auth) {
  const payload = {
    userId: auth.user?.id ?? null,
    phone: cart.phone,

    pizzas: cart.pizzas.map((p) => ({
      name: p.name,
      sauceId: Number(p.sauce?.id),
      doughId: Number(p.dough?.id),
      sizeId: Number(p.size?.id),
      quantity: Number(p.quantity) || 1,
      ingredients: (p.ingredients || [])
        .filter((i) => Number(i.quantity ?? i.count) > 0)
        .map((i) => ({
          ingredientId: Number(i.ingredient?.id ?? i.id),
          quantity: Number(i.quantity ?? i.count),
        })),
    })),

    misc: (cart.misc || [])
      .filter((m) => Number(m.quantity) > 0)
      .map((m) => ({
        miscId: Number(m.id),
        quantity: Number(m.quantity),
      })),
  };

  if (cart.deliveryType !== "pickup") {
    payload.address = {
      street: cart.address?.street ?? "",
      building: cart.address?.building ?? "",
      flat: cart.address?.flat ?? "",
      comment: cart.address?.comment ?? "",
    };
  }

  return payload;
}
