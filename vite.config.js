import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/GestioneFinanze/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        id: './',
        name: 'GestioneFinanze',
        short_name: 'Finanze',
        description: 'Gestione personale di entrate e uscite, 100% offline',
        theme_color: '#2E7D32',
        background_color: '#FFFFFF',
        display: 'standalone',
        display_override: ['standalone', 'browser'],
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
<<<<<<< HEAD
        navigateFallback: `${base}index.html`,
=======
        globIgnores: ['**/node_modules/**/*', '**/src/**/*'],
        navigateFallback: 'index.html',
>>>>>>> 913fdc83ae71e4a77ded90877db796872e6c5612
        cleanupOutdatedCaches: true
      }
    })
  ]
})