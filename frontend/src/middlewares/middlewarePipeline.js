export const middlewarePipeline = (router) => {
  router.beforeEach(async (to, from) => {
    const middlewares = to.meta.middlewares;
    if (!middlewares) {
      return true;
    }
    for (const middleware of middlewares) {
      const result = await middleware({ to, from });
      if (
        typeof result === "object" ||
        typeof result === "string" ||
        result === false
      ) {
        return result;
      }
    }
    return true;
  });
};
