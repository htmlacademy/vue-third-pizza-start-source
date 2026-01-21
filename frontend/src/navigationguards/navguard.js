export const navguard = (router) => {
  router.beforeEach(async (to, from) => {
    const navGuards = to.meta.middlewares;
    if (!navGuards) {
      return true;
    }
    for (const navGuard of navGuards) {
      const result = await navGuard({ to, from });
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