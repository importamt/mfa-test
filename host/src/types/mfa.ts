// MFA 타입 정의

// Import Map 타입
export type ImportMap = Record<string, string>

// 라우팅 테이블 엔트리
export interface RoutingTableEntry {
  pathnames: string[]
  apps: string[]
  meta: RouteMeta
  preload?: boolean
  cache?: boolean
}

// 라우팅 테이블 타입
export type RoutingTable = RoutingTableEntry[]

// 배포 관리 시스템에서 받아올 전체 설정
export interface MFADeploymentConfig {
  version: string
  environment: 'development' | 'production'
  lastUpdated: string
  importMap: ImportMap
  routingTable: RoutingTable
  persistentApps: string[]
  teams?: Record<string, TeamInfo>
  features?: {
    preloadCriticalApps?: boolean
    enablePerfMonitoring?: boolean
    enableErrorTracking?: boolean
    hybridMode?: boolean
  }
}

// 팀 정보 (나중에 필요시 사용)
export interface TeamInfo {
  id: string
  name: string
  apps: string[]
}

// 팀 매니페스트 (나중에 필요시 사용)
export interface TeamManifest {
  teamId: string
  teamName: string
  apps: Array<{
    id: string
    url: string
    version: string
    lastUpdated: string
  }>
  metadata: {
    lastDeployed: string
    deployedBy: string
  }
}

// 브라우저에서 사용할 MFA 설정
export interface MFAConfig {
  ssrData: SSRData
  importMap: ImportMap
  routingTable: RoutingTable
  persistentApps: string[]
  currentRoute: string
  version: string
  environment: 'development' | 'production'
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

// 글로벌 윈도우 인터페이스 확장 제거 - global.d.ts에서 처리