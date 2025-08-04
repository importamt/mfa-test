// MFA Shared Utilities - Host가 React를 제공하는 경우
import * as ReactQuery from '@tanstack/react-query'
import { create } from 'zustand'

// Host가 제공한 React 사용
const React = (window as any).React
const ReactDOM = (window as any).ReactDOM

if (!React || !ReactDOM) {
  console.error('❌ Host가 React를 제공하지 않았습니다!')
}

// MFA 컴포넌트들
import { RoutingProvider as RP } from './providers/RoutingProvider.js'
import { MfaGlobalProvider as MGP } from './providers/GlobalProvider.js'
import { MfaQueryProvider as MQP } from './providers/QueryProvider.js'

// MFA Framework 확장
if (typeof window !== 'undefined') {
  const win = window as any
  const existingFramework = win.MfaFramework || {}
  
  win.MfaFramework = {
    ...existingFramework,
    // Host의 React는 유지
    React: existingFramework.React || React,
    ReactDOM: existingFramework.ReactDOM || ReactDOM,
    // Shared 유틸리티 추가
    RoutingProvider: RP,
    MfaGlobalProvider: MGP,
    MfaQueryProvider: MQP,
    ...ReactQuery,
    create,
    // 버전 정보
    sharedVersion: '1.0.0'
  };
}

// Named exports
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.js'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.js'
export { RoutingProvider } from './providers/RoutingProvider.js'
export { useUserStore, useEventStore, useNotificationStore, useRoutingStore } from './stores/globalStore.js'
export { createMfaApp, enableHMR } from './utils/create-mfa-app'
export * from './types/index.js'
export * from '@tanstack/react-query'
export { create }