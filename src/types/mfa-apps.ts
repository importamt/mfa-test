// MFA 앱 설정 타입 정의

export interface MfaAppConfig {
  name: string
  displayName: string
  version: string
  description: string
  
  dev: {
    port: number
    path: string
    entry: string
  }
  
  prod: {
    url: string
    cdnPath: string
  }
  
  routes: string[]
  
  meta: {
    team: string
    category: 'layout' | 'feature' | 'widget'
    persistent: boolean
    dependencies: string[]
  }
}

export interface MfaGlobalConfig {
  shared: {
    name: string
    version: string
    dev: {
      port: number
      path: string
    }
    prod: {
      url: string
    }
  }
  
  host: {
    name: string
    port: number
    path: string
  }

  cdn: {
    baseUrl: string
    version: string
  }

  development: {
    hmr: boolean
    cors: boolean
    defaultSelection: string[]
  }
}

export interface MfaAppsConfig {
  apps: MfaAppConfig[]
  global: MfaGlobalConfig
}

export interface UserData {
  id: number
  name: string
  email: string
  role: string
  avatar: string
}

export interface AppSettings {
  appName: string
  version: string
  features: string[]
}

// 유틸리티 함수들의 반환 타입
export interface AppListItem {
  name: string
  displayName: string
  devPort: number
  devPath: string
  prodUrl: string
}