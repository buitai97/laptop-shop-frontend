import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@assets": path.resolve(__dirname, "src/assets"),
      
    },
  },
  css: {
    modules: {
      // Only if you want CSS Modules on specific files like *.module.scss
      generateScopedName: "[name]_[local]__[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // Injects variables/mixins into every .scss file automatically
        additionalData: `@use "@/styles/_variables.scss" as *;`,
        // Or classic includePaths if you prefer:
        // includePaths: ['src/styles', 'node_modules'],
      },
    },
  },
});
