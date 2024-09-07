import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [eslintPlugin({ cache: false })],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    sourcemap: false,
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'es',
        entryFileNames: 'main.js',
        esModule: true,
        compact: true,
        globals: {
          jquery: '$',
          gsap: 'gsap',
        },
      },
      external: ['jquery', 'gsap'],
      manualChunks(id) {
        if (id.includes('node_modules')) {
          if (id.includes('gsap')) {
            return 'vendor-gsap'
          }
          return 'vendor'
        }
      },
    },
  },
})
