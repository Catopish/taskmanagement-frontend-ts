import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Port for Vite dev server
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your NestJS backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove /api prefix when forwarding
      },
    },
  },
});
