import { SizeTypes } from "@/modules/constructor/constants";

export const normalizeSizes = (sizes) =>
  sizes.map((size) => ({
    ...size,
    type: SizeTypes[size.multiplier],
  }));
