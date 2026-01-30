<<<<<<< HEAD
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catering: resolve(__dirname, 'catering.html'),
        delivery: resolve(__dirname, 'delivery.html'),
        projectPlan: resolve(__dirname, 'project-plan.html'),
        projectPlanner: resolve(__dirname, 'project-planner.html')
      }
    }
  }
});
=======
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catering: resolve(__dirname, 'catering.html'),
        delivery: resolve(__dirname, 'delivery.html'),
        projectPlan: resolve(__dirname, 'project-plan.html'),
      },
    },
  },
})
>>>>>>> origin/fix-ui-build-issues-451856475899798978
