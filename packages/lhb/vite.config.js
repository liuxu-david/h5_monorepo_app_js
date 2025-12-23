import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
export default defineConfig({
  optimizeDeps: {
    exclude: ['@common/bridge'],
  },
  plugins: [
    uni(),
  ],
  server: {
    port: 8000
  }
})
