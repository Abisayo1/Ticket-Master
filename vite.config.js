import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 1000, // in KB
  },
  plugins: [react()],
})