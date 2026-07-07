import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '7d23-2803-9800-944b-77b8-bb83-7bf9-42be-aa70.ngrok-free.app'
    ]
  }
})