import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  include: ["src/**/*.ts*"],
  base: "/money-calculator/",
  plugins: [react()],
});
