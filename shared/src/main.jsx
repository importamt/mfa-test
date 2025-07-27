import React from 'react'
import { createRoot } from 'react-dom/client'

// Shared 패키지의 메인 진입점
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.jsx'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.jsx'
export { useUserStore, useEventStore, useNotificationStore } from './stores/globalStore.js'
export { useUser, useUsers, useSettings, useUpdateUser, api } from './hooks/useQuery.js'
export * from './utils/common.js'

import { MfaGlobalProvider } from './providers/GlobalProvider.jsx'

// 버전 정보
export const SHARED_VERSION = '1.0.0'

// 글로벌 상수들
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

export const LANGUAGES = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja'
}

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

// 개발용 디버그 함수
export function debugMFA(message, data) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[MFA Debug] ${message}`, data)
  }
}

// Global Provider를 마운트하는 함수들
let providerRoot = null

export function mount(container) {
    if (providerRoot) return
    
    // SSR 데이터 가져오기
    const ssrData = window.MFA_CONFIG?.ssrData || {}
    
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

export function unmount() {
    if (providerRoot) {
        providerRoot.unmount()
        providerRoot = null
        console.log('MFA Global Provider 언마운트 완료')
    }
}