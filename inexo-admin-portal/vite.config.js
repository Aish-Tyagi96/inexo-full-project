import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/admin') {
          res.writeHead(301, { Location: '/admin/' });
          res.end();
        } else {
          next();
        }
      });
    },
    proxy: {
      '/api/v1': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
