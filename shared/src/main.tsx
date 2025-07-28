import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import type { SSRData } from './types/index.js'

// React 관련 라이브러리들을 re-export하여 중복 로드 방지
export { default as React } from 'react'
export * from 'react'
export { createRoot, hydrateRoot } from 'react-dom/client'
export * as ReactDOM from 'react-dom'

// Zustand 라이브러리 re-export
export { create as createStore } from 'zustand'
export * from 'zustand'

// React Query 라이브러리 re-export
export { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
export * from '@tanstack/react-query'

// 타입들을 re-export
export * from './types/index.js'

// Shared 패키지의 메인 진입점
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.js'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.js'
export { useUserStore, useEventStore, useNotificationStore } from './stores/globalStore.js'
export { useUser, useUsers, useSettings, useUpdateUser, api } from './hooks/useQuery.js'
export * from './utils/common.js'

import { MfaGlobalProvider } from './providers/GlobalProvider.js'
import { THEMES, LANGUAGES, NOTIFICATION_TYPES } from './types/index.js'

// 버전 정보
export const SHARED_VERSION = '1.0.0'

// 글로벌 상수들 re-export
export { THEMES, LANGUAGES, NOTIFICATION_TYPES }

// 개발용 디버그 함수
export function debugMFA(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MFA Debug] ${message}`, data)
  }
}

// Global Provider를 마운트하는 함수들
let providerRoot: Root | null = null

export function mount(container: HTMLElement): void {
    if (providerRoot) return
    
    // SSR 데이터 가져오기
    const ssrData: SSRData = window.MFA_CONFIG?.ssrData || {}
    
    // 기존 내용을 감싸는 Provider 설정
    const existingContent = container.innerHTML
    
    providerRoot = createRoot(container)
    providerRoot.render(
        <MfaGlobalProvider ssrData={ssrData}>
            <div dangerouslySetInnerHTML={{ __html: existingContent }} />
        </MfaGlobalProvider>
    )
    
    console.log('MFA Global Provider 마운트 완료', { ssrData })
}

export function unmount(): void {
    if (providerRoot) {
        providerRoot.unmount()
        providerRoot = null
        console.log('MFA Global Provider 언마운트 완료')
    }
}