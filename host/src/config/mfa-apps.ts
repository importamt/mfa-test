// MFA 앱 중앙 설정
export interface MFAAppConfig {
  name: string
  displayName: string
  dev: {
    port: number
    entry: string      // 개발 서버에서 직접 서빙하는 엔트리 파일
    buildPath: string  // 개발 서버에서 빌드된 파일 경로
  }
  prod: {
    url: string       // 프로덕션 빌드 파일 경로
  }
}

export const MFA_APPS: Record<string, MFAAppConfig> = {
  '@mfa/header-app': {
    name: 'header-app',
    displayName: '헤더 앱',
    dev: {
      port: 3003,
      entry: '/src/main.tsx',
      buildPath: '/dist/header-v1.js'
    },
    prod: {
      url: '/apps/header-v1.js'
    }
  },
  '@mfa/micro-app-1': {
    name: 'micro-app-1',
    displayName: '마이크로 앱 1',
    dev: {
      port: 3001,
      entry: '/src/main.tsx',
      buildPath: '/dist/micro-app-1-v1.js'
    },
    prod: {
      url: '/apps/micro-app-1-v1.js'
    }
  },
  '@mfa/micro-app-2': {
    name: 'micro-app-2',
    displayName: '마이크로 앱 2',
    dev: {
      port: 3002,
      entry: '/src/main.tsx',
      buildPath: '/dist/micro-app-2-v1.js'
    },
    prod: {
      url: '/apps/micro-app-2-v1.js'
    }
  }
}

// 개발 모드 옵션
export interface DevModeOptions {
  useSourceFile?: boolean  // true면 .tsx 파일, false면 빌드된 .js 파일 사용
  checkDevServer?: boolean // 개발 서버 체크 여부
}

// 개발 서버 실행 중인지 체크
async function checkDevServer(port: number): Promise<boolean> {
  try {
    console.log(`🔍 포트 ${port} 체크 중...`)
    const response = await fetch(`http://localhost:${port}`, {
      method: 'HEAD',
      mode: 'no-cors'
    })
    console.log(`✅ 포트 ${port}: 개발 서버 실행 중`)
    return true
  } catch (error) {
    console.log(`❌ 포트 ${port}: 개발 서버 없음`)
    return false
  }
}

// 앱 URL 가져오기
export async function getAppUrl(
  appId: string, 
  options: DevModeOptions = { useSourceFile: true, checkDevServer: true }
): Promise<string> {
  const config = MFA_APPS[appId]
  if (!config) {
    throw new Error(`Unknown app: ${appId}`)
  }

  // 프로덕션 환경이면 항상 prod URL 사용
  if (process.env.NODE_ENV === 'production') {
    return config.prod.url
  }

  // 개발 환경 - 서버 사이드에서 미리 결정된 URL 사용
  if (options.checkDevServer === false) {
    // checkDevServer가 false면 바로 프로덕션 URL 반환
    return config.prod.url
  }

  // 개발 환경에서 체크가 필요한 경우 (서버 사이드에서만)
  if (options.checkDevServer && typeof window === 'undefined') {
    const isDevServerRunning = await checkDevServer(config.dev.port)
    if (isDevServerRunning) {
      // 개발 서버가 실행 중일 때
      const path = options.useSourceFile ? config.dev.entry : config.dev.buildPath
      const devUrl = `http://localhost:${config.dev.port}${path}`
      console.log(`🔗 ${appId} 개발 서버 URL:`, devUrl)
      return devUrl
    }
  }

  // 개발 서버가 없으면 빌드된 파일 사용
  return config.prod.url
}

// 라우트별 앱 매핑도 중앙화
export const ROUTE_APPS: Record<string, string[]> = {
  '/': ['@mfa/micro-app-1'],
  '/main': ['@mfa/micro-app-1'],
  '/dashboard': ['@mfa/micro-app-2'],
  '/profile': ['@mfa/micro-app-1', '@mfa/micro-app-2'],
}

// 영구 로드 앱들 (헤더, 사이드바 등)
export const PERSISTENT_APPS: string[] = ['@mfa/header-app']