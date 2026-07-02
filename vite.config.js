import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // i am creating it for vercel deployement.but it was  not  worked. 
  base:process.env.VITE_BASE_PATH || "/Ecommerce-Project",
})
