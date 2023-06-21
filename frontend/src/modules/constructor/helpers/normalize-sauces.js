import { sauceTypes } from "@/modules/constructor/constants";

export const normalizeSauces = (sauces) =>
  sauces.map((sauce) => ({
    ...sauce,
    type: sauceTypes.find((sauceType) => sauceType.name === sauce.name).value,
  }));
