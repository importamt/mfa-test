'use client'

import { React } from '@mfa/framework'
import MFAContainer from './MFAContainer'

import type { ReactNode } from '@mfa/framework'

import { useEffect, useState } from '@mfa/framework'

interface MFAProviderProps {
  children: ReactNode
}

export default function MFAProvider({ children }: MFAProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [RoutingProvider, setRoutingProvider] = useState<any>(null)

  useEffect(() => {
    // Framework가 로드될 때까지 대기
    const checkFramework = () => {
      if ((window as any).MfaFramework?.RoutingProvider) {
        setRoutingProvider(() => (window as any).MfaFramework.RoutingProvider)
        setIsReady(true)
      } else {
        setTimeout(checkFramework, 100)
      }
    }
    checkFramework()
  }, [])

  if (!isReady || !RoutingProvider) {
    return <div>Loading MFA Framework...</div>
  }

  return (
    <RoutingProvider>
      <div className="min-h-screen">
        <MFAContainer />
        {children}
      </div>
    </RoutingProvider>
  )
}