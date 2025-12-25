import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",          // ✅ REQUIRED for Vercel / SPA routing
  build: {
    outDir: "dist",   // ✅ default, explicit for clarity
    sourcemap: false // ✅ keep prod clean (optional)
  },
  server: {
    port: 5173
  }
});
