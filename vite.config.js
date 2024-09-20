import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig({
  plugins: [eslintPlugin({ cache: false })],
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "./src/styles/_variables.scss";`,
      },
    },
  },
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
      input: {
        main: './src/main.js',
        styles: './src/styles/main.scss', // Add your SASS entry point here
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        esModule: true,
        compact: true,
        assetFileNames: 'assets/[name][extname]',
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
