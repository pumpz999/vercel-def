import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import environment from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    react(),
    environment('all', { prefix: 'VITE_' })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@server': '/server'
    }
  }
})
