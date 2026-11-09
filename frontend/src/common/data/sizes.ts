const sizes = {
  1: "small",
  2: "normal",
  3: "big",
} as const;

export type SizeName = (typeof sizes)[keyof typeof sizes];

const sizesById: Readonly<Record<number, SizeName>> = sizes;

export default sizesById;
