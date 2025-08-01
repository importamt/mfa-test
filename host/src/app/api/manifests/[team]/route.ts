// 🚀 팀별 마이크로앱 manifest API - 팀 독립성 확보
import { NextRequest, NextResponse } from 'next/server'

// 실제 환경에서는 데이터베이스나 CDN에서 로드
const TEAM_MANIFESTS = {
  'team-a': [
    {
      name: '@mfa/feature-x',
      version: '2.1.0',
      routes: ['/feature-x', '/feature-x/*'],
      entry: '/apps/team-a/feature-x-v2.1.0.js',
      seo: {
        title: 'Feature X',
        description: 'Team A의 새로운 기능 X',
        keywords: ['feature', 'team-a']
      },
      team: 'team-a',
      environment: 'production'
    }
  ],
  'team-b': [
    {
      name: '@mfa/analytics-dashboard',
      version: '1.5.2', 
      routes: ['/analytics', '/reports/*'],
      entry: '/apps/team-b/analytics-v1.5.2.js',
      seo: {
        title: '분석 대시보드',
        description: 'Team B의 실시간 분석 대시보드',
        keywords: ['analytics', 'dashboard', 'reports']
      },
      team: 'team-b',
      environment: 'production'
    }
  ],
  'platform': [
    {
      name: '@mfa/micro-app-1',
      version: '1.0.0',
      routes: ['/main', '/home', '/'],
      entry: '/apps/micro-app-1-v1.js',
      seo: {
        title: '메인 페이지',
        description: 'Enterprise MFA Platform 메인 대시보드'
      },
      team: 'platform',
      environment: 'development'
    }
  ]
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ team: string }> }
) {
  try {
    const { team } = await params
    
    // 팀별 manifest 조회
    const manifests = TEAM_MANIFESTS[team as keyof typeof TEAM_MANIFESTS] || []
    
    // 실제 환경에서는 여기서 권한 체크, 버전 관리 등
    const filteredManifests = manifests.filter(manifest => {
      // 환경별 필터링
      const environment = process.env.NODE_ENV
      return manifest.environment === environment || manifest.environment === 'development'
    })
    
    return NextResponse.json({
      team,
      manifests: filteredManifests,
      timestamp: Date.now(),
      version: '1.0.0'
    })
    
  } catch (error) {
    console.error(`Team ${params} manifest 로드 실패:`, error)
    
    return NextResponse.json(
      { error: 'Manifest 로드 실패', team: (await params).team },
      { status: 500 }
    )
  }
}

// POST: 새 manifest 등록 (팀에서 자체적으로 등록)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ team: string }> }
) {
  try {
    const { team } = await params
    const manifest = await request.json()
    
    // 실제 환경에서는 데이터베이스에 저장
    console.log(`새 manifest 등록: ${team}`, manifest)
    
    // 유효성 검증
    if (!manifest.name || !manifest.routes || !manifest.entry) {
      return NextResponse.json(
        { error: '필수 필드 누락' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      team,
      manifest: manifest.name,
      message: 'Manifest 등록 완료'
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Manifest 등록 실패' },
      { status: 500 }
    )
  }
}