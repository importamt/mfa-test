import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': {},
    'global': 'window'
  },
  build: {
    lib: {
      entry: 'src/browser-bundle.tsx',
      name: 'MfaFramework',
      fileName: 'mfa-framework',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        format: 'es',
        entryFileNames: 'mfa-framework.js',
        // Named exports를 위한 설정
        exports: 'named',
        // 서브패스를 위한 설정
        preserveModules: false,
        inlineDynamicImports: true
      }
    }
  }
})