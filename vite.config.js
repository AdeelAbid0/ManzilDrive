import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 4000,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/@reduxjs") || id.includes("node_modules/react-redux")) {
            return "vendor-redux";
          }
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          if (id.includes("node_modules/primereact") || id.includes("node_modules/primeicons")) {
            return "vendor-prime";
          }
          if (id.includes("node_modules/formik") || id.includes("node_modules/yup")) {
            return "vendor-form";
          }
          if (id.includes("node_modules/axios") || id.includes("node_modules/moment")) {
            return "vendor-misc";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
