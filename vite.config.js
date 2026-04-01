import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/weather": {
        target: "https://api.openweathermap.org/data/2.5/weather",
        changeOrigin: true,
        rewrite: () => "",
      },
      "/api/forecast": {
        target: "https://api.openweathermap.org/data/2.5/forecast",
        changeOrigin: true,
        rewrite: () => "",
      },
    },
  },
});
