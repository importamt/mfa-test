// MFA Framework - TypeScript build time imports
// 서버 사이드 빌드를 위한 re-export

// React를 re-export
export * as React from 'react'
export * as ReactDOM from 'react-dom'
export { createRoot } from 'react-dom/client'
export type { ReactNode, ReactElement, FC } from 'react'

// React Query re-export
export * from '@tanstack/react-query'

// Zustand re-export
export { create } from 'zustand'

// 타입들을 re-export
export * from './types/index.js'

// Shared 패키지의 exports
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.js'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.js'
export { RoutingProvider } from './providers/RoutingProvider.js'
export { useUserStore, useEventStore, useNotificationStore, useRoutingStore } from './stores/globalStore.js'
export { createMfaApp, enableHMR } from './utils/create-mfa-app'