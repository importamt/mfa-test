// 엔터프라이즈급 MFA 타입 정의
export interface MFAConfig {
  ssrData: SSRData
  importMap: Record<string, string>
  routingTable: RouteConfig[]
  developmentApps: string[]
  sharedLibraries: Record<string, string>
  currentRoute: string
  version: string
  environment: 'development' | 'production'
  cdnBaseUrl?: string
}

export interface SSRData {
  user: User | null
  theme: 'light' | 'dark'
  language: 'ko' | 'en'
  queries: Record<string, any>
  timestamp: number
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

export interface RouteConfig {
  pathnames: string[]
  apps: string[]
  meta: RouteMeta
  preload?: boolean
  cache?: boolean
}

export interface RouteMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

export interface LoadedApp {
  appName: string
  module: MicroAppModule
  container: HTMLElement
  version: string
  loadTime: number
}

export interface MicroAppModule {
  mount: (container: HTMLElement, props?: any) => void | Promise<void>
  unmount: () => void | Promise<void>
  version?: string
  dependencies?: string[]
}

export interface MFAMetrics {
  loadTimes: Record<string, number>
  errorCounts: Record<string, number>
  activeApps: string[]
  lastUpdated: number
}

// 글로벌 윈도우 인터페이스 확장
declare global {
  interface Window {
    MFA_CONFIG: MFAConfig
    MFA_METRICS: MFAMetrics
    __NEXT_MFA_HYBRID__: boolean
    __MFA_SYSTEM__: any
  }
}