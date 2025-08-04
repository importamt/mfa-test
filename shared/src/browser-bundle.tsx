// 브라우저용 번들 - 모든 라이브러리를 하나의 파일로 번들링
import * as ReactAll from 'react'
import * as ReactDOMAll from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import * as ReactQueryAll from '@tanstack/react-query'
import * as ZustandAll from 'zustand'

// React exports
export const React = ReactAll.default
export const {
  useState,
  useEffect,
  useContext,
  createContext,
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
  StrictMode
} = ReactAll

// React DOM exports
export const ReactDOM = ReactDOMAll.default
export const { render, hydrate, unmountComponentAtNode, findDOMNode } = ReactDOMAll
export const { createRoot, hydrateRoot } = ReactDOMClient

// React Query exports
export const {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
  useInfiniteQuery,
  useSuspenseQuery,
  HydrationBoundary,
  dehydrate,
  hydrate: hydrateQuery
} = ReactQueryAll

// Zustand exports
export const { create, createStore } = ZustandAll

// Custom modules
export * from './providers/GlobalProvider'
export * from './providers/QueryProvider'
export * from './providers/RoutingProvider'
export * from './stores/globalStore'
export * from './utils/create-mfa-app'

// Type exports
export type { ReactNode, ReactElement, FC, ComponentType } from 'react'