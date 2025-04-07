export const getPublicImage = (path) => {
    const publicUrl = "/api";
    const divider = path.startsWith("/") ? "" : "/";
    return [publicUrl, path].join(divider);
  };