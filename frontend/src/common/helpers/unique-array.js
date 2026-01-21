export function uniqueByName(array) {
  return Object.values(
    array.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {})
  );
}