import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface RoutingContextType {
  pathname: string
  navigate: (path: string) => void
  params?: Record<string, string>
  query?: Record<string, string>
}

const RoutingContext = createContext<RoutingContextType | null>(null)

export function RoutingProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(typeof window !== 'undefined' ? window.location.pathname : '/')
  const [params, setParams] = useState<Record<string, string>>({})
  const [query, setQuery] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleRouteChange = (event: CustomEvent<{ pathname: string; params?: Record<string, string>; query?: Record<string, string> }>) => {
      setPathname(event.detail.pathname)
      if (event.detail.params) setParams(event.detail.params)
      if (event.detail.query) setQuery(event.detail.query)
    }

    const handlePopstate = () => {
      setPathname(window.location.pathname)
      // URL 쿼리 파라미터 파싱
      const searchParams = new URLSearchParams(window.location.search)
      const newQuery: Record<string, string> = {}
      searchParams.forEach((value, key) => {
        newQuery[key] = value
      })
      setQuery(newQuery)
    }

    // 커스텀 이벤트 리스닝
    window.addEventListener('mfa:route-changed', handleRouteChange as EventListener)
    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('mfa:route-changed', handleRouteChange as EventListener)
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }

  return (
    <RoutingContext.Provider value={{ pathname, navigate, params, query }}>
      {children}
    </RoutingContext.Provider>
  )
}

export function useRouting() {
  const context = useContext(RoutingContext)
  if (!context) {
    throw new Error('useRouting must be used within RoutingProvider')
  }
  return context
}