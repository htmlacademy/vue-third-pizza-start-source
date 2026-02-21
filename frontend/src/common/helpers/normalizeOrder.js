export function normalizeOrder(raw, catalogs) {
  const { doughs, sizes, sauces, ingredients, misc: miscCatalog } = catalogs;

  const pizzas = (raw.orderPizzas || []).map((p) => {
    const dough = doughs.find((d) => d.id === p.doughId);
    const size = sizes.find((s) => s.id === p.sizeId);
    const sauce = sauces.find((s) => s.id === p.sauceId);

    const enrichedIngs = (p.ingredients || []).map((it) => {
      const ing = ingredients.find((i) => i.id === it.ingredientId);
      return {
        ...(ing || {}),
        id: ing?.id ?? it.ingredientId,
        quantity: it.quantity ?? 0,
      };
    });

    const ingSum = enrichedIngs.reduce(
      (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
      0,
    );
    const base = (dough?.price || 0) + (sauce?.price || 0) + ingSum;
    const unit = base * (size?.multiplier || 1);
    const totalPrice = unit * (p.quantity || 1);

    return {
      id: p.id,
      name: p.name,
      quantity: p.quantity || 1,
      dough,
      size,
      sauce,
      ingredients: enrichedIngs,
      totalPrice,
    };
  });

  const misc = (raw.orderMisc || []).map((m) => {
    const item = miscCatalog.find((x) => x.id === m.miscId);
    return {
      ...(item || {}),
      id: item?.id ?? m.miscId,
      quantity: m.quantity || 0,
    };
  });

  console.log("raw.orderAddress", raw.orderAddress);

  const address = raw.orderAddress
    ? {
        id: raw.orderAddress.id,
        street: raw.orderAddress.street,
        building: raw.orderAddress.building,
        flat: raw.orderAddress.flat,
        comment: raw.orderAddress.comment,
        name: raw.orderAddress.name,
      }
    : null;

  const pizzasTotal = pizzas.reduce((s, p) => s + (p.totalPrice || 0), 0);
  const miscTotal = misc.reduce(
    (s, x) => s + (x.price || 0) * (x.quantity || 0),
    0,
  );

  return {
    id: raw.id,
    phone: raw.phone,
    userId: raw.userId,
    address,
    pizzas,
    misc,
    total: pizzasTotal + miscTotal,
  };
}
