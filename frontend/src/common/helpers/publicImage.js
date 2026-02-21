export const getPublicImage = (path) => {
  const base =
    import.meta.env.VITE_API_URL ||
    `${window.location.protocol}//${window.location.hostname}:3000`;

  const p = path.startsWith("/") ? path : `/${path}`;

  const clean = p.replace(/^\/api(\/|$)/, "/");

  return `${base}${clean}`;
};
