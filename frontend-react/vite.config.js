import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Absolute imports (no ../ issues on Linux / CI)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // ✅ Required so assets resolve correctly on Vercel
  base: "/",

  build: {
    outDir: "dist",
    assetsDir: "assets", // explicit (Vite default, but important for Vercel routing)
    sourcemap: false,
    emptyOutDir: true,
  },

  server: {
    port: 5173,
    open: true,
  },
});
