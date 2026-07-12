import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Absolute imports — e.g. import { cn } from "@/lib/utils"
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    // Split vendor bundle for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react";
          if (id.includes("node_modules/react-router-dom"))  return "router";
          if (id.includes("node_modules/framer-motion"))     return "motion";
          if (id.includes("node_modules/lucide-react"))      return "icons";
        },
      },
    },
  },
});
