import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      // Pokud je vite.config.ts ve složce 'ui', cesta k src je jen './src'
      "@": path.resolve(__dirname, "./src"),
    },
  },
});