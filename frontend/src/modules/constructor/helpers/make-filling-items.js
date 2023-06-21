export const makeFillingItems = (ingredients) =>
  ingredients.map(({ id, type, count }) => {
    if (count === 2) {
      return { id, cssMod: `pizza__filling--${type} pizza__filling--second` };
    }

    if (count === 3) {
      return { id, cssMod: `pizza__filling--${type} pizza__filling--third` };
    }

    return { id, cssMod: `pizza__filling--${type}` };
  });
