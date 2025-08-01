/**
 * MFA 마이크로 앱 중앙 설정
 * 
 * 향후 DB나 배포 관리 시스템 API로 대체될 예정
 * 현재는 개발 편의를 위한 임시 설정 파일
 */

import type { MfaAppsConfig, MfaAppConfig, AppListItem } from '@/types/mfa-apps'

export const MFA_APPS_CONFIG: MfaAppsConfig = {
  apps: [
    {
      name: 'header-app',
      displayName: '헤더 앱',
      version: '1.0.0',
      description: '전역 헤더 및 네비게이션',
      
      // 개발 환경 설정
      dev: {
        port: 3003,
        path: 'apps/header-app',
        entry: '/src/main.tsx'
      },
      
      // 프로덕션 환경 설정
      prod: {
        url: '/apps/header-v1.js',
        cdnPath: 'header-v1.js'
      },
      
      // 라우팅 설정
      routes: [],
      
      // 메타데이터
      meta: {
        team: 'platform',
        category: 'layout',
        persistent: true, // 영구 앱 여부
        dependencies: ['@mfa/shared']
      }
    },
    
    {
      name: 'micro-app-1',
      displayName: '메인 대시보드',
      version: '1.2.0',
      description: '메인 대시보드 및 홈 화면',
      
      dev: {
        port: 3001,
        path: 'apps/micro-app-1',
        entry: '/src/main.tsx'
      },
      
      prod: {
        url: '/apps/micro-app-1-v1.js',
        cdnPath: 'micro-app-1-v1.js'
      },
      
      routes: ['/main', '/home', '/'],
      
      meta: {
        team: 'frontend-team-a',
        category: 'feature',
        persistent: false,
        dependencies: ['@mfa/shared']
      }
    },
    
    {
      name: 'micro-app-2',
      displayName: '사용자 관리',
      version: '2.1.0',
      description: '사용자 프로필 및 설정 관리',
      
      dev: {
        port: 3002,
        path: 'apps/micro-app-2',
        entry: '/src/main.tsx'
      },
      
      prod: {
        url: '/apps/micro-app-2-v1.js',
        cdnPath: 'micro-app-2-v1.js'
      },
      
      routes: ['/profile', '/settings'],
      
      meta: {
        team: 'frontend-team-b',
        category: 'feature',
        persistent: false,
        dependencies: ['@mfa/shared']
      }
    },
    
    {
      name: 'pip-app',
      displayName: 'PIP 위젯',
      version: '1.0.0',
      description: 'Picture-in-Picture 위젯',
      
      dev: {
        port: 3004,
        path: 'apps/pip-app',
        entry: '/src/main.tsx'
      },
      
      prod: {
        url: '/apps/pip-v1.js',
        cdnPath: 'pip-v1.js'
      },
      
      routes: ['/pip'],
      
      meta: {
        team: 'platform',
        category: 'widget',
        persistent: true,
        dependencies: ['@mfa/shared']
      }
    }
  ],

  // 글로벌 설정
  global: {
    shared: {
      name: '@mfa/shared',
      version: '1.0.0',
      dev: {
        port: 5177,
        path: 'shared'
      },
      prod: {
        url: '/static/shared/main.js'
      }
    },
    
    host: {
      name: 'mfa-host',
      port: 3000,
      path: 'host'
    },

    // CDN 설정
    cdn: {
      baseUrl: process.env.CDN_BASE_URL || '/apps',
      version: process.env.MFA_VERSION || 'latest'
    },

    // 개발 환경 설정
    development: {
      hmr: true,
      cors: true,
      defaultSelection: ['micro-app-1'] // 기본 개발 앱
    }
  }
}

// 유틸리티 함수들
export const MfaConfigUtils = {
  // 앱 이름으로 설정 찾기
  getAppByName(name: string): MfaAppConfig | undefined {
    return MFA_APPS_CONFIG.apps.find(app => app.name === name)
  },

  // 영구 앱들 가져오기
  getPersistentApps(): MfaAppConfig[] {
    return MFA_APPS_CONFIG.apps.filter(app => app.meta.persistent)
  },

  // 페이지 앱들 가져오기
  getPageApps(): MfaAppConfig[] {
    return MFA_APPS_CONFIG.apps.filter(app => !app.meta.persistent)
  },

  // 라우트별 앱 매핑
  getAppsForRoute(pathname: string): MfaAppConfig[] {
    return MFA_APPS_CONFIG.apps.filter(app => 
      app.routes.some(route => 
        route === pathname || (route === '/' && pathname === '/main')
      )
    )
  },

  // 개발 포트 매핑 객체 생성
  getDevPortMap(): Record<string, number> {
    const portMap: Record<string, number> = {}
    MFA_APPS_CONFIG.apps.forEach(app => {
      portMap[app.name] = app.dev.port
    })
    return portMap
  },

  // Import Map 생성을 위한 앱 리스트
  getAppsList(): AppListItem[] {
    return MFA_APPS_CONFIG.apps.map(app => ({
      name: app.name,
      displayName: app.displayName,
      devPort: app.dev.port,
      devPath: app.dev.path,
      prodUrl: app.prod.url
    }))
  }
}