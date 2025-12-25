import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ FIXES utils/tags resolution permanently
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  base: "/", // ✅ required for Vercel SPA routing

  build: {
    outDir: "dist",
    sourcemap: false,
  },

  server: {
    port: 5173,
  },
});
