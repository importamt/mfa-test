import React, { ComponentType } from 'react'
import { createRoot, type Root } from 'react-dom/client'

// MFA 앱 정보를 저장하는 타입
interface MfaAppInfo {
  root: Root
  Component: ComponentType
}

// HMR을 위한 전역 저장소 타입 선언
declare global {
  interface Window {
    __MFA_APPS__: Map<string, MfaAppInfo>
  }
}

// 전역 저장소 초기화
if (typeof window !== 'undefined' && !window.__MFA_APPS__) {
  window.__MFA_APPS__ = new Map()
}

/**
 * MFA(Micro Frontend Architecture) 앱을 생성하는 헬퍼 함수
 * 
 * @param appName - 앱의 고유 이름
 * @param AppComponent - React 컴포넌트
 * @returns mount/unmount 함수를 포함한 객체
 * 
 * @example
 * ```typescript
 * // main.tsx
 * import { createMfaApp } from '@mfa/shared'
 * import App from './App'
 * 
 * const { mount, unmount } = createMfaApp('my-app', App)
 * export { mount, unmount }
 * ```
 */
export function createMfaApp(appName: string, AppComponent: ComponentType) {
  let root: Root | null = null

  return {
    /**
     * 컴포넌트를 DOM에 마운트
     * @param containerOrId - 마운트할 DOM 요소 또는 요소 ID
     */
    mount(containerOrId: HTMLElement | string) {
      if (root) {
        console.warn(`${appName}는 이미 마운트되어 있습니다.`)
        return
      }
      
      // 컨테이너 찾기
      let container: HTMLElement | null
      if (typeof containerOrId === 'string') {
        container = document.getElementById(containerOrId)
        if (!container) {
          throw new Error(`Container with id '${containerOrId}' not found`)
        }
      } else {
        container = containerOrId
      }
      
      root = createRoot(container)
      root.render(<AppComponent />)
      
      // HMR을 위해 전역 저장소와 컴포넌트에 root 저장
      window.__MFA_APPS__.set(appName, { root, Component: AppComponent })
      ;(AppComponent as any).root = root
      
      console.log(`✅ ${appName} 마운트 완료`)
    },
    
    /**
     * 컴포넌트를 DOM에서 언마운트
     */
    unmount() {
      if (root) {
        root.unmount()
        root = null
        window.__MFA_APPS__.delete(appName)
        ;(AppComponent as any).root = null
        console.log(`❌ ${appName} 언마운트 완료`)
      }
    }
  }
}

/**
 * React 컴포넌트에 HMR(Hot Module Replacement) 기능을 활성화
 * 
 * @param meta - import.meta 객체
 * @param appName - 앱의 고유 이름
 * @param Component - HMR을 적용할 React 컴포넌트
 * 
 * @example
 * ```typescript
 * // App.tsx 파일의 마지막에 추가
 * export default MyApp
 * 
 * // HMR 활성화
 * enableHMR(import.meta, 'my-app', MyApp)
 * ```
 */
export function enableHMR(
  meta: ImportMeta, 
  appName: string, 
  Component: ComponentType
): void {
  const hot = (meta as any).hot
  
  if (!hot) return
  
  hot.accept((newModule: any) => {
    console.log(`🔥 HMR: ${appName} 컴포넌트 업데이트 감지`)
    
    const app = window.__MFA_APPS__.get(appName)
    if (!newModule || !app) {
      console.warn(`HMR 실패: ${appName}의 정보를 찾을 수 없습니다.`)
      return
    }
    
    // 새 컴포넌트 가져오기
    const NewComponent = newModule.default || newModule[Component.name]
    if (!NewComponent) {
      console.warn(`HMR 실패: 새 컴포넌트를 찾을 수 없습니다.`)
      return
    }
    
    // 리렌더링
    app.root.render(<NewComponent />)
    
    // root 참조 유지
    ;(NewComponent as any).root = app.root
    
    // 전역 저장소 업데이트
    window.__MFA_APPS__.set(appName, { ...app, Component: NewComponent })
    
    console.log(`✅ HMR 적용 완료: ${appName}`)
  })
}