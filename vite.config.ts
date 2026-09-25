import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const base = process.env.VITE_BASE || '/'

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        classes: resolve(__dirname, 'classes.html'),
        dining: resolve(__dirname, 'dining.html'),
        kitchen: resolve(__dirname, 'kitchen.html'),
        about: resolve(__dirname, 'about.html'),
        book: resolve(__dirname, 'book.html'),
      },
    },
  },
})
