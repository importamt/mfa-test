// @mfa/framework 타입 선언
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

// React를 default와 named export로
export default React
export { React, ReactDOM, createRoot }

// JSX 네임스페이스 export
export namespace JSX {
  export interface Element extends React.ReactElement<any, any> {}
  export interface ElementClass extends React.Component<any, any> {}
  export interface ElementAttributesProperty { props: {}; }
  export interface ElementChildrenAttribute { children: {}; }
  export interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  export interface IntrinsicAttributes extends React.Attributes {}
  export interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
}

// React hooks와 타입들을 개별 export
export {
  // Hooks
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
  useDeferredValue,
  useTransition,
  useId,
  useSyncExternalStore,
  useInsertionEffect,
  // Types
  type FC,
  type ReactNode,
  type ReactElement,
  type ComponentType,
  type ComponentProps,
  type PropsWithChildren,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type FocusEvent,
  type DragEvent,
  type TouchEvent,
  type WheelEvent,
  type AnimationEvent,
  type TransitionEvent,
  type ClipboardEvent,
  type PointerEvent,
  type CompositionEvent,
  type UIEvent,
  type SyntheticEvent,
  type RefObject,
  type MutableRefObject,
  type ForwardedRef,
  type Ref,
  type ReactEventHandler,
  type SetStateAction,
  type Dispatch,
  type Context,
  type Provider,
  type Consumer,
  type ContextType,
  type ReactChild,
  type ReactFragment,
  type ReactPortal,
  type Suspense,
  type SuspenseProps,
  type Fragment,
  type StrictMode,
  type Profiler,
  type ProfilerProps,
  type createElement,
  type cloneElement,
  type createContext,
  type forwardRef,
  type lazy,
  type memo,
  type useDebugValue as useDebugValueType,
  type useDeferredValue as useDeferredValueType,
  type useTransition as useTransitionType,
  type startTransition,
  type useId as useIdType,
  type useSyncExternalStore as useSyncExternalStoreType,
  type useInsertionEffect as useInsertionEffectType,
} from 'react'
export * from '@tanstack/react-query'
export { create } from 'zustand'

// MFA Framework 고유 exports
export * from './types/index.js'
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.js'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.js'
export { RoutingProvider } from './providers/RoutingProvider.js'
export { useUserStore, useEventStore, useNotificationStore, useRoutingStore } from './stores/globalStore.js'
export { useUser, useUsers, useSettings, useUpdateUser, api } from './hooks/useQuery.js'
export { useRouting } from './hooks/useRouting.js'
export * from './utils/common.js'
export * from './utils/create-mfa-app.js'
export { THEMES, LANGUAGES, NOTIFICATION_TYPES } from './types/index.js'
export declare const SHARED_VERSION: string