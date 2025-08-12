import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env': {},
    'global': 'window'
  },
  
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'MfaFramework',
      fileName: 'mfa-framework',
      formats: ['es']
    },
    
    rollupOptions: {
      // React 등 모든 의존성을 번들에 포함
      // Remote apps는 이 번들을 Import Map으로 사용
      external: [],
      
      output: {
        format: 'es',
        entryFileNames: 'mfa-framework.js',
        exports: 'named',
        // 단일 번들로 생성
        preserveModules: false,
        inlineDynamicImports: true,
        // 전역 변수 설정
        globals: {}
      }
    },
    
    // 번들 크기 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },
    
    // 소스맵 생성 (디버깅용)
    sourcemap: true
  },
  
  // 개발 서버 설정
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})