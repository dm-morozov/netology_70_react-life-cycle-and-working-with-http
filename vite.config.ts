import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Указываем базовый путь для GitHub Pages
  base: '/netology_70_react-life-cycle-and-working-with-http/',
  plugins: [react()],
})
