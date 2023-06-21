const doughTypes = [
  {
    name: "Тонкое",
    value: "light",
  },
  {
    name: "Толстое",
    value: "large",
  },
];

export const normalizeDoughs = (doughs) =>
  doughs.map((dough) => ({
    ...dough,
    type: doughTypes.find((size) => size.name === dough.name).value,
  }));
