import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
export default defineConfig({
  optimizeDeps: {
    exclude: ['@common/bridge'],
  },
  plugins: [
    uni(),
  ],
  server: {
    port: 8000
  },
  // resolve: {
  //   alias: {
  //     '@common/bridge': path.resolve(__dirname, '../../common/bridge'),
  //   },
  // },
})
