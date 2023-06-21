import { doughTypes } from "@/modules/constructor/constants";

export const normalizeDoughs = (doughs) =>
  doughs.map((dough) => ({
    ...dough,
    type: doughTypes.find((size) => size.name === dough.name).value,
  }));
