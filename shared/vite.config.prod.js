import { defineConfig } from 'vite'
import baseConfig from './vite.config.js'

export default defineConfig({
  ...baseConfig,
  mode: 'production',
  build: {
    ...baseConfig.build,
    lib: {
      entry: 'src/main.jsx',
      name: 'MfaShared',
      fileName: () => 'shared-v1.js',
      formats: ['es']
    },
    rollupOptions: {
      ...baseConfig.build?.rollupOptions,
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        entryFileNames: 'shared-v1.js',
        format: 'es',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient'
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.ENVIRONMENT': `"${process.env.ENVIRONMENT || 'prod'}"`
  }
})