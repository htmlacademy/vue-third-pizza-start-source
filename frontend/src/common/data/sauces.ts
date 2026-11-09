const sauces = {
  1: "tomato",
  2: "creamy",
} as const;

export type SauceName = (typeof sauces)[keyof typeof sauces];

const saucesById: Readonly<Record<number, SauceName>> = sauces;

export default saucesById;
