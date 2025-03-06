import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8081,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js", // Ensure entry JS files go into the 'js/' folder
        chunkFileNames: "js/[name].js", // Ensure chunks also go into the 'js/' folder
        assetFileNames: ({ name }) => {
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
            return "fonts/[name][extname]";
          }
          if (/\.(png|jpe?g|gif|svg)$/.test(name ?? "")) {
            return "img/[name][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "css/[name][extname]"; // Ensures CSS goes into 'css/' folder
          }
          return "js/[name][extname]"; // Default: JavaScript and other assets go into 'js/'
        },
      },
      plugins: [],
    },
  },
});
