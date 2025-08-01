import { NextRequest, NextResponse } from 'next/server'
import { MFA_APPS, getAppUrl } from '@/config/mfa-apps'
import fs from 'fs/promises'
import path from 'path'

// 개발 설정 읽기
async function getDevConfig() {
  try {
    // Next.js는 host 디렉토리에서 실행되므로 상위 디렉토리로 이동
    const configPath = path.join(process.cwd(), '..', '.mfa-dev-config.json')
    console.log('📄 설정 파일 경로:', configPath)
    const data = await fs.readFile(configPath, 'utf8')
    const config = JSON.parse(data)
    console.log('📋 개발 설정:', config)
    return config
  } catch (error) {
    console.error('❌ 설정 파일 읽기 실패:', error)
    return { lastSelected: [] }
  }
}

// MFA 설정 API - 서버에서 HEAD 체크하고 URL 결정
export async function GET(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  
  // 서버에서 앱 URL들을 미리 결정
  const appUrls: Record<string, string> = {}
  const devConfig = await getDevConfig()
  
  for (const [appId, config] of Object.entries(MFA_APPS)) {
    if (isDev) {
      // 개발 환경에서는 선택된 앱만 개발 서버 체크
      const isSelectedForDev = devConfig.lastSelected.includes(config.name)
      console.log(`🔍 ${appId} (${config.name}): 선택됨=${isSelectedForDev}`)
      
      if (isSelectedForDev) {
        // 선택된 앱은 개발 서버 체크 후 URL 결정
        const url = await getAppUrl(appId, { 
          useSourceFile: true,
          checkDevServer: true
        })
        appUrls[appId] = url
      } else {
        // 선택되지 않은 앱은 프로덕션 빌드 사용
        appUrls[appId] = config.prod.url
        console.log(`📦 ${appId}: 프로덕션 빌드 사용 - ${config.prod.url}`)
      }
    } else {
      // 프로덕션은 항상 빌드된 파일 사용
      appUrls[appId] = config.prod.url
    }
  }

  return NextResponse.json({
    apps: appUrls,
    environment: isDev ? 'development' : 'production',
    developmentApps: isDev ? devConfig.lastSelected : []
  })
}