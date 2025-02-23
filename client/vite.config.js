import { defineConfig } from "vite"

import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/uploads": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, "/uploads"), // Keep path same
      },
    },
  },
})
