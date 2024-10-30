import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  define: {
    "import.meta.env.VITE_APP_URL_BACKEND": JSON.stringify(
      process.env.VITE_APP_URL_BACKEND
    ),
  },
  base: "/",
});
