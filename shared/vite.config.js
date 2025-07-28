import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3005,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'MfaShared',
      fileName: 'shared-v1',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', '@tanstack/react-query', 'zustand'],
      output: {
        entryFileNames: 'shared-v1.js',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient',
          '@tanstack/react-query': 'ReactQuery',
          'zustand': 'Zustand'
        }
      }
    }
  }
})