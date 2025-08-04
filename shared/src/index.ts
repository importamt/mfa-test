// @mfa/framework - 심플한 re-export
// 서버: workspace dependency로 직접 import
// 클라이언트: Import Map으로 동적 로드

// React re-exports
import React from 'react'
export { React }
export { 
  useState, 
  useEffect, 
  useContext, 
  useReducer, 
  useCallback, 
  useMemo, 
  useRef,
  forwardRef,
  memo,
  Fragment,
  Component,
  PureComponent,
  Children,
  cloneElement,
  createElement,
  isValidElement,
  lazy,
  Suspense,
  StrictMode,
  createContext
} from 'react'
export type { ReactNode, ReactElement, FC, ComponentType, PropsWithChildren } from 'react'

// React DOM re-exports
import ReactDOM from 'react-dom'
export { ReactDOM }
export { createPortal, flushSync } from 'react-dom'
export { createRoot, hydrateRoot } from 'react-dom/client'

// React Query re-exports
export * from '@tanstack/react-query'

// Zustand re-exports
export * from 'zustand'

// Custom exports
export * from './providers/GlobalProvider'
export * from './providers/QueryProvider' 
export * from './providers/RoutingProvider'
export * from './stores/globalStore'
export * from './utils/create-mfa-app'
export * from './types'