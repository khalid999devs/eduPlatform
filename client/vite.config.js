import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['@zoomus/websdk'],
  // },
  optimizeDeps: {
    include: ['react-canvas-draw'],
  },
});
