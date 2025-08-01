// Vite 플러그인: MFA 개발 모드 지원
export default function mfaDevPlugin() {
  return {
    name: 'vite-plugin-mfa-dev',
    apply: 'serve', // 개발 서버에서만 적용
    transform(code, id) {
      // main.tsx 파일에 대해서만 처리
      if (id.endsWith('/src/main.tsx')) {
        // ESM export가 없으면 추가
        if (!code.includes('export {') && !code.includes('export default')) {
          // mount, unmount 함수가 있는지 확인하고 export 추가
          const hasMount = code.includes('export function mount') || code.includes('function mount')
          const hasUnmount = code.includes('export function unmount') || code.includes('function unmount')
          
          if (hasMount || hasUnmount) {
            // 이미 export가 있거나 함수가 정의되어 있으면 그대로 사용
            return code
          }
        }
      }
      return code
    },
    configureServer(server) {
      // CORS 헤더 추가
      server.middlewares.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        next()
      })
    }
  }
}