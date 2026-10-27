import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Source lives in site/. The build is written to the repo root, which GitHub Pages
// serves directly from main, so `npm run build` + push is the whole deploy.
export default defineConfig({
  root: 'site',
  plugins: [react()],
  base: '/',
  build: {
    outDir: '..',
    emptyOutDir: false,
  },
})
