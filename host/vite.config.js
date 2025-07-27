import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      external: ['@mfa/micro-app-1', '@mfa/micro-app-2', '@mfa/header-app', '@mfa/pip-app']
    }
  }
})