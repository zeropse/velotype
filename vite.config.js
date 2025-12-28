import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("recharts")) return "vendor_recharts";
            if (id.includes("@radix-ui") || id.includes("vaul")) {
              return "vendor_radix";
            }
            if (id.includes("@tabler/icons-react")) {
              return "vendor_icons";
            }
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
