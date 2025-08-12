// MFA Framework - 모든 공통 라이브러리를 중앙에서 export
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import * as ReactQuery from '@tanstack/react-query'
import { create } from 'zustand'

// 즉시 전역에 React 노출 (중요: 다른 모듈이 로드되기 전에)
if (typeof window !== 'undefined') {
  // 전역 변수로 노출 (remote apps가 사용)
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
  (window as any).ReactDOMClient = { createRoot };
  (window as any).ReactQuery = ReactQuery;
  (window as any).Zustand = { create };
}

// MFA 컴포넌트들을 가져오기 (React가 전역에 노출된 후)
import { RoutingProvider as RP } from './providers/RoutingProvider'
import { MfaGlobalProvider as MGP } from './providers/GlobalProvider'
import { MfaQueryProvider as MQP } from './providers/QueryProvider'

// MFA Framework 전역 객체 생성
if (typeof window !== 'undefined') {
  (window as any).MfaFramework = {
    React,
    ReactDOM,
    createRoot,
    RoutingProvider: RP,
    MfaGlobalProvider: MGP,
    MfaQueryProvider: MQP,
    ...ReactQuery,
    create
  };
  
}

// React 전체를 export (hooks 포함)
export { React, ReactDOM, createRoot }

// jsx-runtime export (Vite 빌드에서 필요)
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'
export { jsx, jsxs, Fragment }

// Icons removed - each app should import lucide-react directly

// MFA 앱 생성 및 HMR 지원
export { createMfaApp, enableHMR } from './utils/create-mfa-app'

// React hooks를 명시적으로 export
export const { 
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  useId,
  useTransition,
  useDeferredValue,
  useSyncExternalStore,
  useInsertionEffect
} = React

// React 타입도 export
export type { ReactNode, ReactElement, FC, PropsWithChildren } from 'react'

export * from '@tanstack/react-query'
export { create }

// 타입들을 re-export
export * from './types/index'

// Shared 패키지의 메인 진입점
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider'
export { RoutingProvider } from './providers/RoutingProvider'
export { useUserStore, useEventStore, useNotificationStore, useRoutingStore } from './stores/globalStore'
export { useUser, useUsers, useSettings, useUpdateUser, api } from './hooks/useQuery'
export { useRouting } from './hooks/useRouting'
export * from './utils/common'
export * from './utils/create-mfa-app'

// 글로벌 상수들 re-export
export { THEMES, LANGUAGES, NOTIFICATION_TYPES } from './types/index'

// 버전 정보
export const SHARED_VERSION = '1.0.0'