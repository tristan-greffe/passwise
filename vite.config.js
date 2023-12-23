import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr' 
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      host: true,
      port: 8080
    },
    plugins: [
      react(), 
      svgr(), 
      VitePWA({ 
        devOptions: {
          enabled: true
        },
        registerType: 'autoUpdate', 
        injectRegister: 'auto',
        manifest: {
          name: 'Passwise',
          short_name: 'Passwise',
          description: 'Open source password manager with zero-knowledge encryption',
          orientation: 'portrait',
          background_color: '#FFFFFF',
          theme_color: '#c9ccd640',
          id: './',
          icons: [
            {
              src: 'passwise-icon-64x64.png',
              sizes: '64x64',
              type: 'image/png'
            },
            {
              src: 'passwise-icon-128x128.png',
              sizes: '128x128',
              type: 'image/png'
            },
            {
              src: 'passwise-icon-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: 'passwise-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          screenshots: [
            {
              src: 'screenshot-540x720.png',
              sizes: '540x720',
              type: 'image/png',
              form_factor: 'narrow'
            },
            {
              src: 'screenshot-720x540.png',
              sizes: '720x540',
              type: 'image/png',
              form_factor: 'wide'
            }
          ]
        }
      })
    ]
  })
}
