import React, { ReactNode } from 'react'
import { MfaQueryProvider } from './QueryProvider.js'
import { useUserStore, useNotificationStore } from '../stores/globalStore.js'
import type { SSRData } from '../types/index.js'

// 글로벌 알림 컴포넌트
function NotificationCenter(): JSX.Element | null {
  const { notifications, removeNotification } = useNotificationStore()

  if (notifications.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            background: notification.type === 'error' ? '#ff6b6b' : 
                       notification.type === 'success' ? '#51cf66' : '#339af0',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '250px',
            maxWidth: '400px',
            cursor: 'pointer'
          }}
          onClick={() => notification.id && removeNotification(notification.id)}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            {notification.title}
          </div>
          {notification.message && (
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {notification.message}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface MfaGlobalProviderProps {
  children: ReactNode
  ssrData?: SSRData
}

// 메인 Global Provider
export function MfaGlobalProvider({ children, ssrData = {} }: MfaGlobalProviderProps): JSX.Element {
  const { initializeFromSSR } = useUserStore()

  // SSR 데이터로 초기화
  React.useEffect(() => {
    if (ssrData.user || ssrData.theme || ssrData.language) {
      initializeFromSSR(ssrData)
    }
  }, [ssrData, initializeFromSSR])

  return (
    <MfaQueryProvider ssrQueries={ssrData.queries}>
      {children}
      <NotificationCenter />
    </MfaQueryProvider>
  )
}

// 커스텀 훅들 - 마이크로 앱에서 사용
export const useGlobalUser = useUserStore
export const useGlobalNotification = useNotificationStore