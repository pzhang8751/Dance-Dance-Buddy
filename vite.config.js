import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // important for Electron — uses relative paths
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@mediapipe/pose': new URL('./src/empty.js', import.meta.url).pathname
    }
  }
})