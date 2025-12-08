import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://backend:3000/",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/public": {
        target: "http://backend:3000/",
        changeOrigin: true,
      },
    },
  },
});
