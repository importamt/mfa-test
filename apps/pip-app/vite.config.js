import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    server: {
      port: 3004,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    },
    resolve: {
      alias: isDev ? {
        '@mfa/shared': path.resolve(__dirname, '../../shared/src/main.tsx')
      } : {}
    },
    esbuild: {
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment'
    },
    build: {
      lib: {
        entry: 'src/main.tsx',
        name: 'PipApp',
        fileName: 'pip-v1',
        formats: ['es']
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-dom/client'],
        output: {
          entryFileNames: 'pip-v1.js',
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