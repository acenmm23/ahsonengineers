import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Source lives in site/. The build is written to the repo root, which GitHub Pages
// serves directly from main, so `npm run build` + push is the whole deploy.
// Each project has its own page so it gets a real, shareable URL.
export default defineConfig({
  root: 'site',
  plugins: [react()],
  base: '/',
  build: {
    outDir: '..',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'site/index.html'),
        betterkey: resolve(__dirname, 'site/projects/betterkey/index.html'),
        ece118: resolve(__dirname, 'site/projects/ece118/index.html'),
        littleLedger: resolve(__dirname, 'site/projects/little-ledger/index.html'),
      },
    },
  },
})
