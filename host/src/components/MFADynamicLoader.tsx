'use client'

import { React, useEffect, useRef, useState } from '@mfa/framework'

interface MFADynamicLoaderProps {
  appId: string
  moduleUrl: string
  containerId?: string
}

export default function MFADynamicLoader({ appId, moduleUrl, containerId }: MFADynamicLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    const loadScript = () => {
      // 이미 로드된 스크립트가 있으면 제거
      if (scriptRef.current) {
        scriptRef.current.remove()
      }

      const script = document.createElement('script')
      script.type = 'module'
      script.id = `mfa-script-${appId}`
      
      // ESM 모듈을 동적으로 import하고 mount 실행
      script.textContent = `
        (async () => {
          try {
            console.log('🔄 ${appId} 로딩 시작: ${moduleUrl}');
            
            // Vite 개발 서버의 경우 HMR 지원
            const isViteDevServer = '${moduleUrl}'.includes('localhost:') && '${moduleUrl}'.endsWith('.tsx');
            
            const module = await import('${moduleUrl}');
            const container = document.getElementById('${containerId || `mfa-${appId}`}');
            
            if (container) {
              if (module.mount && typeof module.mount === 'function') {
                // 프로덕션 모드: mount 함수 사용
                await module.mount(container);
                console.log('✅ ${appId} 마운트 완료 (mount 함수 사용)');
                
                // 언마운트 함수 저장
                if (module.unmount) {
                  window.__MFA_UNMOUNT__ = window.__MFA_UNMOUNT__ || {};
                  window.__MFA_UNMOUNT__['${appId}'] = module.unmount;
                }
              } else if (module.default && typeof module.default === 'function') {
                // 개발 모드: React 컴포넌트 직접 렌더링
                console.log('🔥 ${appId} React 컴포넌트 직접 렌더링 (HMR 모드)');
                
                // React와 ReactDOM을 동적으로 가져오기
                const React = window.React || (await import('@mfa/framework')).React;
                const ReactDOM = window.ReactDOM || (await import('@mfa/framework')).ReactDOM;
                
                // 컴포넌트 렌더링
                const root = ReactDOM.createRoot(container);
                root.render(React.createElement(module.default));
                
                // 언마운트 함수 생성
                window.__MFA_UNMOUNT__ = window.__MFA_UNMOUNT__ || {};
                window.__MFA_UNMOUNT__['${appId}'] = () => {
                  root.unmount();
                  console.log('${appId} 언마운트 완료');
                };
              } else {
                console.warn('⚠️ ${appId}에서 mount 함수나 React 컴포넌트를 찾을 수 없습니다.');
              }
            }
          } catch (error) {
            console.error('❌ ${appId} 로드 실패:', error);
            const container = document.getElementById('${containerId || `mfa-${appId}`}');
            if (container) {
              container.innerHTML = '<div class="text-red-600">로드 실패: ' + error.message + '</div>';
            }
          }
        })();
      `
      
      scriptRef.current = script
      document.body.appendChild(script)
    }

    // 컨테이너가 준비되면 스크립트 로드
    if (containerRef.current) {
      loadScript()
    }

    return () => {
      // 언마운트 함수 실행
      const unmount = (window as any).__MFA_UNMOUNT__?.[appId]
      if (unmount) {
        unmount()
        delete (window as any).__MFA_UNMOUNT__[appId]
      }
      
      // 스크립트 제거
      if (scriptRef.current) {
        scriptRef.current.remove()
      }
    }
  }, [appId, moduleUrl, containerId])

  return (
    <div 
      ref={containerRef}
      id={containerId || `mfa-${appId}`}
      className="mfa-container"
      data-app={appId}
    >
      {error && (
        <div className="text-red-600 p-4 border border-red-300 rounded">
          {error}
        </div>
      )}
    </div>
  )
}