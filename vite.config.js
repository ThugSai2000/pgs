import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'http://192.168.29.110:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // You can also define environment variables
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('http://192.168.29.110:5000/api')
  }
})
