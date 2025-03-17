import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      '/claim':'https://salesstudio-9n5r.vercel.app/'
    }
  }
  
})
