import React, { ReactNode, ReactElement, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 글로벌 QueryClient 인스턴스
let globalQueryClient: QueryClient | null = null

export function getQueryClient(): QueryClient {
  if (!globalQueryClient) {
    globalQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5분
          gcTime: 10 * 60 * 1000,   // 10분 (구 cacheTime)
          retry: 1,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: 1,
        },
      },
    })
  }
  return globalQueryClient
}

// SSR에서 prefetch된 데이터로 QueryClient 초기화
export function initializeQueryClient(ssrQueries: Record<string, any> = {}): QueryClient {
  const queryClient = getQueryClient()
  
  // SSR에서 가져온 쿼리 데이터들을 QueryClient에 설정
  Object.entries(ssrQueries).forEach(([queryKey, data]) => {
    try {
      queryClient.setQueryData(JSON.parse(queryKey), data)
    } catch (error) {
      console.warn('Failed to parse query key:', queryKey, error)
    }
  })
  
  return queryClient
}

interface MfaQueryProviderProps {
  children: ReactNode
  ssrQueries?: Record<string, any>
}

// Provider 컴포넌트
export function MfaQueryProvider({ children, ssrQueries }: MfaQueryProviderProps): ReactElement {
  const queryClient = useMemo(() => {
    return initializeQueryClient(ssrQueries)
  }, [ssrQueries])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}