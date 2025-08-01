declare module '@mfa/shared' {
  import React from 'react'
  
  // Types
  export const THEMES: {
    readonly LIGHT: 'light'
    readonly DARK: 'dark'
    readonly AUTO: 'auto'
  }

  export const LANGUAGES: {
    readonly KO: 'ko'
    readonly EN: 'en'
    readonly JA: 'ja'
  }

  export const NOTIFICATION_TYPES: {
    readonly INFO: 'info'
    readonly SUCCESS: 'success'
    readonly WARNING: 'warning'
    readonly ERROR: 'error'
  }

  export type Theme = typeof THEMES[keyof typeof THEMES]
  export type Language = typeof LANGUAGES[keyof typeof LANGUAGES]
  export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES]

  export interface User {
    id: number
    name: string
    email: string
    role: string
  }

  export interface Notification {
    id?: string
    type: NotificationType
    title: string
    message: string
    duration?: number
    timestamp?: number
  }

  export interface Settings {
    appName: string
    version: string
    features: string[]
  }

  export interface SSRData {
    user?: User
    theme?: Theme
    language?: Language
    queries?: Record<string, any>
  }

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

  // Providers
  export function MfaGlobalProvider(props: { 
    children: React.ReactNode
    ssrData?: SSRData 
  }): JSX.Element
  
  export function MfaQueryProvider(props: { 
    children: React.ReactNode 
  }): JSX.Element

  export function RoutingProvider(props: { 
    children: React.ReactNode 
  }): JSX.Element

  // Hooks
  export function useRouting(): {
    pathname: string
    navigate: (path: string) => void
    params?: Record<string, string>
    query?: Record<string, string>
  }

  export function useGlobalUser(): User | null
  export function useGlobalNotification(): {
    notifications: Notification[]
    addNotification: (notification: Notification) => void
    removeNotification: (id: string) => void
  }

  // Zustand stores
  export function useUserStore(): {
    user: User | null
    setUser: (user: User | null) => void
    theme: Theme
    setTheme: (theme: Theme) => void
    language: Language
    setLanguage: (language: Language) => void
  }

  export function useEventStore(): {
    events: any[]
    addEvent: (event: any) => void
    clearEvents: () => void
  }

  export function useNotificationStore(): {
    notifications: Notification[]
    addNotification: (notification: Notification) => void
    removeNotification: (id: string) => void
  }

  // React Query hooks
  export function useUser(userId: number): any
  export function useUsers(): any
  export function useSettings(): any
  export function useUpdateUser(): any
  export const api: {
    getUser: (userId: number) => Promise<User>
    getUsers: () => Promise<User[]>
    getSettings: () => Promise<Settings>
    updateUser: (userId: number, data: Partial<User>) => Promise<User>
  }

  // Query Client
  export function getQueryClient(): any
  export function initializeQueryClient(): any

  // Utils
  export function debugMFA(message: string, data?: any): void
  export const SHARED_VERSION: string

  // Mount functions
  export function mount(container: HTMLElement): void
  export function unmount(): void
}