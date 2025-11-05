import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dusata.syu-likelion.org",
        changeOrigin: true,
        secure: true,
        // Some backends (e.g., Spring) may return 403 "Invalid CORS request" even through a dev proxy
        // if they see an Origin header from localhost. Rewrite/remove Origin so the server accepts it.
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            try {
              // Option 1: set Origin to target domain
              proxyReq.setHeader("origin", "https://dusata.syu-likelion.org");
              proxyReq.setHeader("referer", "https://dusata.syu-likelion.org/");
            } catch {}
          });
        },
      },
    },
  },
});
