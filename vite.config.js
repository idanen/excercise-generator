import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/excercise-generator',
  plugins: [react()],
  css: { modules: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests-setup.ts',
  },
});
