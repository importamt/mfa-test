/**
 * Mock MFA Configuration API
 * 실제 API 서버를 시뮬레이션하는 함수들
 */

export type AppType = 'page' | 'persistent'
export type AppMode = 'development' | 'production'

export interface MfaAppConfig {
  id: string
  name: string
  displayName: string
  type: AppType
  route?: string // page 타입인 경우만
  defaultPort?: number
  productionUrl: string
  description?: string
}

export interface MfaFrameworkConfig {
  id: string
  name: string
  defaultPort: number
  productionUrl: string
}

export interface MfaSystemConfig {
  apps: MfaAppConfig[]
  framework: MfaFrameworkConfig
  version: string
  lastUpdated: string
}

/**
 * Mock API: MFA 시스템 설정 가져오기
 * 실제로는 API 서버에서 가져올 내용
 */
export async function fetchMfaSystemConfig(): Promise<MfaSystemConfig> {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    framework: {
      id: '@mfa/framework',
      name: 'framework',
      defaultPort: 5173,
      productionUrl: '/framework/main.js'
    },
    apps: [
      {
        id: '@mfa/onboarding',
        name: 'onboarding',
        displayName: '온보딩',
        type: 'page',
        route: '/onboarding',
        defaultPort: 4001,
        productionUrl: '/apps/onboarding-v1.js',
        description: '사용자 온보딩 화면'
      },
      {
        id: '@mfa/login',
        name: 'login',
        displayName: '로그인',
        type: 'page',
        route: '/login',
        defaultPort: 4002,
        productionUrl: '/apps/login-v1.js',
        description: '로그인 및 인증 화면'
      },
      {
        id: '@mfa/main',
        name: 'main',
        displayName: '메인',
        type: 'page',
        route: '/',
        defaultPort: 4003,
        productionUrl: '/apps/main-v1.js',
        description: '메인 대시보드 화면'
      },
      {
        id: '@mfa/header',
        name: 'header',
        displayName: '헤더',
        type: 'persistent',
        defaultPort: 4004,
        productionUrl: '/apps/header-v1.js',
        description: '전역 헤더 (항상 표시)'
      },
      {
        id: '@mfa/player',
        name: 'player',
        displayName: '플레이어',
        type: 'persistent',
        defaultPort: 4005,
        productionUrl: '/apps/player-v1.js',
        description: '미디어 플레이어 (항상 마운트)'
      }
    ]
  }
}

/**
 * Mock API: Import Map 생성
 * 앱 ID 리스트를 받아서 Import Map을 생성
 */
export async function getImportMapForApps(
  appIds: string[], 
  isDevelopment: boolean = false
): Promise<{ importMap: any; developmentApps: string[] }> {
  const config = await fetchMfaSystemConfig()
  const devConfig = await import('./mfa-dev-config-client').then(m => m.getDevConfig())
  
  const imports: Record<string, string> = {}
  const developmentApps: string[] = []
  
  // Framework는 항상 빌드된 파일 사용
  imports['@mfa/framework'] = config.framework.productionUrl
  
  // React jsx-runtime도 framework에서 제공
  imports['react/jsx-runtime'] = config.framework.productionUrl
  
  // 각 앱에 대한 URL 결정
  for (const appId of appIds) {
    const appConfig = config.apps.find(app => app.id === appId)
    if (!appConfig) continue
    
    // 개발 모드이고 해당 앱이 선택되었는지 확인
    const isAppInDevMode = isDevelopment && 
      devConfig.lastSelected?.includes(appConfig.name) && 
      devConfig.apps?.[appConfig.name]
    
    if (isAppInDevMode) {
      const port = devConfig.apps[appConfig.name].port
      imports[appId] = `http://localhost:${port}/src/main.tsx`
      developmentApps.push(appConfig.name)
    } else {
      imports[appId] = appConfig.productionUrl
    }
  }
  
  return {
    importMap: { imports },
    developmentApps
  }
}

/**
 * Mock API: 사용자 인증 정보
 */
export async function fetchUserAuth() {
  await new Promise(resolve => setTimeout(resolve, 50))
  
  return {
    isAuthenticated: false,
    user: null,
    permissions: []
  }
}