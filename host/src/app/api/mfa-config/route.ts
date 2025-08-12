import { NextRequest, NextResponse } from 'next/server'
import { fetchMfaSystemConfig } from '@/lib/mfa-api-mock'
import { readDevConfig, resolveAppUrl } from '@/lib/mfa-dev-config'

/**
 * MFA 설정 API 엔드포인트
 * Mock API를 통해 시스템 설정을 가져오고
 * 개발 모드에서는 .mfa-dev-config.json 기반으로 URL 결정
 */
export async function GET(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  
  // Mock API에서 시스템 설정 가져오기
  const systemConfig = await fetchMfaSystemConfig()
  const devConfig = await readDevConfig()
  
  // 각 앱의 URL 결정
  const appUrls: Record<string, string> = {}
  const importMap: Record<string, string> = {}
  
  // Framework URL 결정
  if (isDev && devConfig.framework?.port) {
    const frameworkUrl = `http://localhost:${devConfig.framework.port}/src/main.tsx`
    importMap[systemConfig.framework.id] = frameworkUrl
  } else {
    importMap[systemConfig.framework.id] = systemConfig.framework.productionUrl
  }
  
  // 각 앱 URL 결정
  for (const app of systemConfig.apps) {
    const url = await resolveAppUrl(
      app.id,
      app.name,
      app.productionUrl,
      isDev
    )
    appUrls[app.id] = url
  }
  
  // 라우팅 정보 생성 (page 타입 앱들만)
  const routes = systemConfig.apps
    .filter(app => app.type === 'page' && app.route)
    .reduce((acc, app) => {
      acc[app.route!] = app.id
      return acc
    }, {} as Record<string, string>)
  
  // persistent 앱들 (항상 마운트)
  const persistentApps = systemConfig.apps
    .filter(app => app.type === 'persistent')
    .map(app => app.id)
  
  return NextResponse.json({
    apps: appUrls,
    importMap,
    routes,
    persistentApps,
    environment: isDev ? 'development' : 'production',
    developmentApps: isDev ? devConfig.lastSelected : [],
    systemConfig
  })
}