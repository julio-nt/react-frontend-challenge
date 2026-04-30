import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@core': path.resolve(__dirname, './src/core'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom)[\\/]/, priority: 30 },
            { name: 'vendor-router', test: /node_modules[\\/]@tanstack[\\/]react-router/, priority: 25 },
            { name: 'vendor-query', test: /node_modules[\\/]@tanstack[\\/]react-query/, priority: 20 },
            { name: 'vendor-form', test: /node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/, priority: 15 },
            { name: 'vendor-ui', test: /node_modules[\\/](radix-ui|@base-ui|cmdk|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
});
