import { defineConfig } from 'vite'
import brotli from 'rollup-plugin-brotli'

export default defineConfig({
  server: {
    port: 8500,
    proxy: {
      '/api/v3/': {
        target: 'https://q.trap.jp/',
        changeOrigin: true,
        ws: false
      }
    }
  },
  plugins: [brotli()]
})
