// 글로벌 상수 타입들
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const

export const LANGUAGES = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja'
} as const

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const

// 타입 추출
export type Theme = typeof THEMES[keyof typeof THEMES]
export type Language = typeof LANGUAGES[keyof typeof LANGUAGES]
export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES]

// 사용자 인터페이스
export interface User {
  id: number
  name: string
  email: string
  role: string
}

// 알림 인터페이스
export interface Notification {
  id?: string
  type: NotificationType
  title: string
  message: string
  duration?: number
  timestamp?: number
}

// 설정 인터페이스
export interface Settings {
  appName: string
  version: string
  features: string[]
}

// SSR 데이터 인터페이스
export interface SSRData {
  user?: User
  theme?: Theme
  language?: Language
  queries?: Record<string, any>
}

// 마이크로 프론트엔드 구성 인터페이스
export interface MFAConfig {
  developmentApps: string[]
  sharedLibraries: Record<string, string>
  productionBaseUrls: Record<string, string>
  developmentUrls: Record<string, string>
  persistentApps: string[]
  routingTable: Array<{
    pathnames: string[]
    apps: string[]
  }>
  ssrData: SSRData
}

// 글로벌 Window 인터페이스 확장
declare global {
  interface Window {
    MFA_CONFIG: MFAConfig
    __MFA_SHARED__: any
  }
}