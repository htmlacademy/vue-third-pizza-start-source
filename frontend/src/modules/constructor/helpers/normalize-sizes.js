const SizeTypes = {
  1: "small",
  2: "normal",
  3: "big",
};

export const normalizeSizes = (sizes) =>
  sizes.map((size) => ({
    ...size,
    type: SizeTypes[size.multiplier],
  }));
