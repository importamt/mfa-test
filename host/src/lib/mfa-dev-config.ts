/**
 * MFA 개발 설정 관리
 * .mfa-dev-config.json 파일을 읽고 쓰는 유틸리티
 */

import fs from 'fs/promises'
import path from 'path'

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

const CONFIG_FILE_NAME = '.mfa-dev-config.json'

function getConfigPath(): string {
  // Host 앱은 host/ 디렉토리에서 실행되므로 상위 디렉토리의 설정 파일 참조
  return path.join(process.cwd(), '..', CONFIG_FILE_NAME)
}

/**
 * 개발 설정 읽기
 */
export async function readDevConfig(): Promise<MfaDevConfig> {
  try {
    const configPath = getConfigPath()
    const data = await fs.readFile(configPath, 'utf8')
    const config = JSON.parse(data) as MfaDevConfig
    
    // 기본 구조 확인 및 초기화
    if (!config.apps) {
      config.apps = {}
    }
    
    return config
  } catch (error) {
    // 파일이 없거나 파싱 실패시 기본값 반환
    console.log('📝 설정 파일이 없어 기본값 사용')
    return {
      lastSelected: [],
      apps: {},
      framework: { port: 5173 }
    }
  }
}

/**
 * 개발 설정 가져오기 (동기화된 버전)
 * getImportMapForApps에서 사용
 */
export async function getDevConfig(): Promise<MfaDevConfig> {
  return readDevConfig()
}

/**
 * 개발 설정 저장
 */
export async function saveDevConfig(config: MfaDevConfig): Promise<void> {
  const configPath = getConfigPath()
  config.lastRun = new Date().toISOString()
  
  await fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    'utf8'
  )
  
  console.log('💾 개발 설정 저장 완료:', configPath)
}

/**
 * 앱별 포트 정보 업데이트
 */
export async function updateAppPort(appName: string, port: number, host: string = 'localhost'): Promise<void> {
  const config = await readDevConfig()
  
  if (!config.apps[appName]) {
    config.apps[appName] = {}
  }
  
  config.apps[appName].port = port
  config.apps[appName].host = host
  
  await saveDevConfig(config)
}

/**
 * 선택된 앱 목록 업데이트
 */
export async function updateSelectedApps(apps: string[]): Promise<void> {
  const config = await readDevConfig()
  config.lastSelected = apps
  await saveDevConfig(config)
}

/**
 * 개발 서버 실행 중인지 체크
 */
export async function checkDevServer(host: string, port: number): Promise<boolean> {
  try {
    const response = await fetch(`http://${host}:${port}`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(1000)
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
  
  const config = await readDevConfig()
  
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
  
  // 개발 서버 실행 체크
  const isRunning = await checkDevServer(host, appConfig.port)
  if (!isRunning) {
    console.warn(`⚠️ ${appName} 개발 서버(${host}:${appConfig.port})가 실행중이지 않아 프로덕션 빌드 사용`)
    return productionUrl
  }
  
  return getDevServerUrl(appName, appConfig.port, host)
}