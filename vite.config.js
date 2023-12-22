import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
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
    plugins: [react(), svgr()],
    server: {
      host: true,
      port: 8080
    }
  })
}
