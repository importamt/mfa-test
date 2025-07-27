import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 글로벌 QueryClient 인스턴스
let globalQueryClient = null

export function getQueryClient() {
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
export function initializeQueryClient(ssrQueries = {}) {
  const queryClient = getQueryClient()
  
  // SSR에서 가져온 쿼리 데이터들을 QueryClient에 설정
  Object.entries(ssrQueries).forEach(([queryKey, data]) => {
    queryClient.setQueryData(JSON.parse(queryKey), data)
  })
  
  return queryClient
}

// Provider 컴포넌트
export function MfaQueryProvider({ children, ssrQueries }) {
  const queryClient = React.useMemo(() => {
    return initializeQueryClient(ssrQueries)
  }, [ssrQueries])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}