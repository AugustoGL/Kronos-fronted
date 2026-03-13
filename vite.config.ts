import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['b567-45-178-194-171.ngrok-free.app']  // o podés poner el dominio específico de ngrok
  }
})
