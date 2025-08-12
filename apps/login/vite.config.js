import react from '@vitejs/plugin-react'
import path from 'path'
import { createMicroAppConfig } from '../../vite.base.config.js'

const APP_NAME = 'login'
const PORT = 4002

export default createMicroAppConfig(APP_NAME, PORT, {
  plugins: [react()],
  resolve: {
    alias: {
      '@mfa/framework': path.resolve(__dirname, '../../shared/src/main.tsx')
    }
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
})