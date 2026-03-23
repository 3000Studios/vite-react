import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mpa-fallback',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/planner') {
            req.url = '/planner/index.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catering: resolve(__dirname, 'catering.html'),
        delivery: resolve(__dirname, 'delivery.html'),
        projectPlan: resolve(__dirname, 'planner/index.html')
      }
    }
  }
});
