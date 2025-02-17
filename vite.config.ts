import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 3000,
      host: true,  // Enable host access
      strictPort: true,
      watch: {
        usePolling: true
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).map(([key, value]) => 
          [`import.meta.env.${key}`, JSON.stringify(value)]
        )
      )
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom'
      ]
    }
  }
})
