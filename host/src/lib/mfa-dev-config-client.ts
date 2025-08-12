/**
 * MFA 개발 설정 관리 (클라이언트 버전)
 * 브라우저에서 실행되는 버전
 */

export interface AppDevConfig {
  port?: number
  host?: string
}

export interface MfaDevConfig {
  lastSelected: string[]
  lastRun?: string
  apps: Record<string, AppDevConfig>
  framework?: AppDevConfig
}

/**
 * 개발 설정 가져오기 (API를 통해)
 */
export async function getDevConfig(): Promise<MfaDevConfig> {
  try {
    const response = await fetch('/api/dev-config')
    if (!response.ok) {
      throw new Error('Failed to fetch dev config')
    }
    const config = await response.json()
    return config
  } catch (error) {
    console.error('Failed to fetch dev config:', error)
    return {
      lastSelected: [],
      apps: {},
      framework: { port: 5173 }
    }
  }
}

/**
 * 개발 서버 실행 중인지 체크
 */
export async function checkDevServer(host: string, port: number): Promise<boolean> {
  try {
    const response = await fetch(`http://${host}:${port}`, {
      method: 'HEAD',
      mode: 'no-cors', // CORS 우회
    })
    return true
  } catch {
    return false
  }
}

/**
 * 앱의 개발 서버 URL 생성
 */
export function getDevServerUrl(appName: string, port: number, host: string = 'localhost'): string {
  // Vite 개발 서버는 /src/main.tsx 엔트리 포인트 사용
  return `http://${host}:${port}/src/main.tsx`
}

/**
 * 개발 모드에서 사용할 앱 URL 결정
 */
export async function resolveAppUrl(
  appId: string,
  appName: string,
  productionUrl: string,
  isDevelopment: boolean
): Promise<string> {
  if (!isDevelopment) {
    return productionUrl
  }
  
  const config = await getDevConfig()
  
  // 선택된 앱이 아니면 프로덕션 URL 사용
  if (!config.lastSelected.includes(appName)) {
    return productionUrl
  }
  
  // 포트 정보가 있는지 확인
  const appConfig = config.apps[appName]
  if (!appConfig?.port) {
    console.warn(`⚠️ ${appName}의 포트 정보가 없어 프로덕션 빌드 사용`)
    return productionUrl
  }
  
  const host = appConfig.host || 'localhost'
  
  // 개발 서버 실행 체크는 스킵 (CORS 문제)
  // 실제로는 개발 서버가 실행 중이라고 가정
  
  return getDevServerUrl(appName, appConfig.port, host)
}