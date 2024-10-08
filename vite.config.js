import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      cors: false
    },
  },
})
