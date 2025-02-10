import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',  // This tells esbuild to process .js files as JSX
  },
  server: {
    port: 3025, // Change this to your desired port number
  },
});