import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Needed for docker
    port: 80, // Customizable
    strictPort: true, // So the port from container correctly matches with the frontend
  },
  plugins: [react(),
    svgr({
      exportAsDefault: true, // 'import { ReactComponent as Logo }...' can now be turned to 'import Logo...'
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'] // Needed to have unique IDs for SVG files, else icons will overwrite each other
      }
    })],
});
