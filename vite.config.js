import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base — works under any subdirectory on Plesk
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
