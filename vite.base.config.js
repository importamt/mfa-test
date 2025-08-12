import { defineConfig } from 'vite'

// 모든 마이크로앱이 공유하는 기본 Vite 설정
export const baseExternals = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  '@tanstack/react-query',
  'zustand',
  '@mfa/framework'
];

// 개발 서버 기본 설정
export const baseServerConfig = {
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
};

// 공통 빌드 설정 생성 함수
export function createMicroAppConfig(appName, port, customConfig = {}) {
  return defineConfig(({ command }) => {
    const isDev = command === 'serve'
    
    return {
      ...customConfig,
      server: {
        port,
        ...baseServerConfig,
        ...(customConfig.server || {})
      },
      define: {
        'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
        'import.meta.env.DEV': isDev
      },
      build: {
        lib: {
          entry: 'src/main.tsx',
          name: appName,
          fileName: `${appName}-v1`,
          formats: ['es']
        },
        rollupOptions: {
          external: baseExternals,
          output: {
            format: 'es',
            // Import Map을 사용하므로 globals 설정 제거
            // 외부 모듈은 import 문으로 유지됨
            // CSS를 JS에 인라인으로 포함
            inlineDynamicImports: true,
            assetFileNames: '[name][extname]'
          }
        },
        // CSS를 JS 번들에 인라인으로 포함
        cssCodeSplit: false
      }
    }
  })
}