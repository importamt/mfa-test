'use client'

import { useEffect, useState, useRef } from 'react'
import { getMfaHost } from '@/lib/mfa-host'

interface MfaRemoteLoaderProps {
  appId: string
  appName: string
}

export default function MfaRemoteLoader({ appId, appName }: MfaRemoteLoaderProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let mounted = true
    
    const loadApp = async () => {
      try {
        // 컨테이너가 준비될 때까지 대기
        if (!containerRef.current) {
          console.log('[MfaRemoteLoader] Waiting for container...')
          setTimeout(loadApp, 100)
          return
        }
        
        const host = getMfaHost()
        
        // Host 초기화 (한 번만)
        if (!initialized) {
          await host.initialize()
          if (!mounted) return
          setInitialized(true)
        }
        
        // 앱 로드 및 마운트
        const containerId = `mfa-container-${appName}`
        console.log(`[MfaRemoteLoader] Mounting ${appId} to ${containerId}`)
        
        // 컨테이너 확인
        const container = document.getElementById(containerId)
        if (!container) {
          console.error(`[MfaRemoteLoader] Container ${containerId} not found in DOM`)
          throw new Error(`Container ${containerId} not found`)
        }
        
        await host.mountApp(appId, containerId)
        
        if (mounted) {
          setLoading(false)
        }
      } catch (err) {
        console.error(`[MfaRemoteLoader] Failed to load ${appId}:`, err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setLoading(false)
        }
      }
    }
    
    // 로딩 상태가 false가 되면 컨테이너가 렌더링됨
    if (!loading) {
      loadApp()
    }
    
    return () => {
      mounted = false
      // Cleanup: unmount app
      try {
        const host = getMfaHost()
        host.unmountApp(appId)
      } catch (error) {
        console.error(`[MfaRemoteLoader] Failed to unmount ${appId}:`, error)
      }
    }
  }, [appId, appName, initialized, loading])
  
  // 첫 렌더링 후 바로 로딩 해제
  useEffect(() => {
    setLoading(false)
  }, [])
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-red-900/10 border border-red-500 p-5 rounded-lg max-w-lg">
          <h2 className="text-red-500 mb-2 text-xl font-bold">Error loading {appName}</h2>
          <p className="text-sm">{error}</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-gray-400 text-xs">Debug Info</summary>
            <pre className="mt-2 text-xs bg-black/50 p-2 rounded overflow-auto">
              {JSON.stringify({ appId, appName, error }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div 
        ref={containerRef}
        id={`mfa-container-${appName}`} 
        className="w-full h-full"
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div>Loading {appName}...</div>
          </div>
        </div>
      )}
    </div>
  )
}