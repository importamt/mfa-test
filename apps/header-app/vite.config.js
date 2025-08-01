import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    plugins: [react()],
    server: {
      port: 3003,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      fs: {
        // dist 폴더도 서빙할 수 있도록 설정
        allow: ['..']
      }
    },
    preview: {
      port: 3003,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    resolve: {
      alias: {
        '@mfa/shared': path.resolve(__dirname, '../../shared/src/main.tsx')
      }
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
        name: 'HeaderApp',
        fileName: 'header-v1',
        formats: ['es']
      },
      rollupOptions: {
        external: [],
        output: {
          entryFileNames: 'header-v1.js',
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