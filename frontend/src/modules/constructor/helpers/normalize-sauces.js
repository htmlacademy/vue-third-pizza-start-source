const sauceTypes = [
  {
    name: "Томатный",
    value: "tomato",
  },
  {
    name: "Сливочный",
    value: "creamy",
  },
];
export const normalizeSauces = (sauces) =>
  sauces.map((sauce) => ({
    ...sauce,
    type: sauceTypes.find((sauceType) => sauceType.name === sauce.name).value,
  }));
