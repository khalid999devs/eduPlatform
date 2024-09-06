import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['@zoomus/websdk'],
  // },
  optimizeDeps: {
    include: ["react-canvas-draw", "chart.js", "react-chartjs-2"],
  },
});
