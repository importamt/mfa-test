'use client'

import React from 'react'
import { RoutingProvider } from '@mfa/shared'
import MFAContainer from './MFAContainer'

interface MFAProviderProps {
  children: React.ReactNode
}

export default function MFAProvider({ children }: MFAProviderProps) {
  return (
    <RoutingProvider>
      <div className="min-h-screen">
        <MFAContainer />
          {children}
      </div>
    </RoutingProvider>
  )
}