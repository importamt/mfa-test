import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    server: {
      port: 4003,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    },
    resolve: {
      alias: isDev ? {
        '@mfa/framework': path.resolve(__dirname, '../../shared/src/main.tsx')
      } : {}
    },
    esbuild: {
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    build: {
      lib: {
        entry: 'src/main.tsx',
        name: 'MainApp',
        fileName: 'main-v1',
        formats: ['es']
      },
      rollupOptions: {
        external: ['@mfa/framework', 'react/jsx-runtime'],
        output: {
          entryFileNames: 'main-v1.js',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-dom/client': 'ReactDOMClient',
          }
        }
      }
    }
  }
})