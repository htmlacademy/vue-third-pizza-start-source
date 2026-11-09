const doughSizes = {
  1: "light",
  2: "large",
} as const;

export type DoughSize = (typeof doughSizes)[keyof typeof doughSizes];

const doughSizesById: Readonly<Record<number, DoughSize>> = doughSizes;

export default doughSizesById;
