import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: "/",
  build: {
    cssMinify: false,
    minify: false,
    reportCompressedSize: false,
  },
}));
