// MFA Host 시스템 - TypeScript로 깔끔하게 정리
import { fetchMfaSystemConfig, getImportMapForApps } from './mfa-api-mock'
import { loadModule } from './mfa-loader'

export interface MfaApp {
  id: string
  name: string
  mount: (containerId: string) => Promise<void>
  unmount: () => void
}

export interface ImportMapEntry {
  [key: string]: string
}

export interface ImportMap {
  imports: ImportMapEntry
}

class MicroFrontendHost {
  private apps: Map<string, MfaApp> = new Map()
  private mountedApps: Map<string, { container: string; instance: any }> = new Map()
  private importMap: ImportMap | null = null
  
  constructor() {
    console.log('[MFA Host] Initializing...')
  }
  
  async initialize(): Promise<void> {
    try {
      // 1. MFA 시스템 설정 로드
      const config = await fetchMfaSystemConfig()
      console.log('[MFA Host] System config loaded:', config)
      
      // 2. Import Map 생성
      const isDevelopment = process.env.NODE_ENV === 'development'
      const importMapData = await getImportMapForApps(
        config.apps.map(app => app.id),
        isDevelopment
      )
      
      this.importMap = importMapData.importMap
      console.log('[MFA Host] Import map created:', this.importMap)
      
      // 3. Import Map을 document에 주입
      if (this.importMap) {
        this.injectImportMap(this.importMap)
      }
      
    } catch (error) {
      console.error('[MFA Host] Initialization failed:', error)
      throw error
    }
  }
  
  private injectImportMap(importMap: ImportMap): void {
    // 기존 import map 제거
    const existing = document.querySelector('script[type="importmap"]')
    if (existing) {
      existing.remove()
    }
    
    // 새 import map 주입
    const script = document.createElement('script')
    script.type = 'importmap'
    script.textContent = JSON.stringify(importMap, null, 2)
    document.head.appendChild(script)
    console.log('[MFA Host] Import map injected')
  }
  
  async loadApp(appId: string): Promise<MfaApp> {
    // 이미 로드된 앱이면 반환
    if (this.apps.has(appId)) {
      console.log(`[MFA Host] App ${appId} already loaded`)
      return this.apps.get(appId)!
    }
    
    try {
      console.log(`[MFA Host] Loading app: ${appId}`)
      
      // Use native browser import with Import Map
      const module = await loadModule(appId)
      
      if (!module.mount || !module.unmount) {
        throw new Error(`App ${appId} does not export mount/unmount functions`)
      }
      
      const app: MfaApp = {
        id: appId,
        name: appId.replace('@mfa/', ''),
        mount: module.mount,
        unmount: module.unmount
      }
      
      this.apps.set(appId, app)
      console.log(`[MFA Host] App ${appId} loaded successfully`)
      
      return app
    } catch (error) {
      console.error(`[MFA Host] Failed to load app ${appId}:`, error)
      throw error
    }
  }
  
  async mountApp(appId: string, containerId: string): Promise<void> {
    // 이미 마운트된 경우 처리
    if (this.mountedApps.has(appId)) {
      console.warn(`[MFA Host] App ${appId} is already mounted`)
      return
    }
    
    try {
      // 앱 로드 (없으면 로드)
      const app = await this.loadApp(appId)
      
      // 컨테이너 확인
      const container = document.getElementById(containerId)
      if (!container) {
        throw new Error(`Container ${containerId} not found`)
      }
      
      console.log(`[MFA Host] Mounting app ${appId} to ${containerId}`)
      
      // CSS 로드 (있는 경우)
      const appName = appId.replace('@mfa/', '')
      this.loadAppStyles(appName)
      
      // 앱 마운트
      await app.mount(containerId)
      
      // 마운트 정보 저장
      this.mountedApps.set(appId, { 
        container: containerId, 
        instance: app 
      })
      
      console.log(`[MFA Host] App ${appId} mounted successfully`)
    } catch (error) {
      console.error(`[MFA Host] Failed to mount app ${appId}:`, error)
      throw error
    }
  }
  
  private loadAppStyles(appName: string): void {
    // 이미 로드된 스타일인지 확인
    const existingStyle = document.querySelector(`link[data-app="${appName}"]`)
    if (existingStyle) {
      return
    }
    
    // CSS 파일 경로
    const cssPath = `/apps/styles/${appName}.css`
    
    // link 태그 생성
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssPath
    link.setAttribute('data-app', appName)
    
    // head에 추가
    document.head.appendChild(link)
    console.log(`[MFA Host] Loaded styles for ${appName}`)
  }
  
  unmountApp(appId: string): void {
    const mountInfo = this.mountedApps.get(appId)
    if (!mountInfo) {
      console.warn(`[MFA Host] App ${appId} is not mounted`)
      return
    }
    
    try {
      console.log(`[MFA Host] Unmounting app ${appId}`)
      
      const app = this.apps.get(appId)
      if (app) {
        app.unmount()
      }
      
      // CSS 제거 (옵션)
      const appName = appId.replace('@mfa/', '')
      this.removeAppStyles(appName)
      
      this.mountedApps.delete(appId)
      console.log(`[MFA Host] App ${appId} unmounted successfully`)
    } catch (error) {
      console.error(`[MFA Host] Failed to unmount app ${appId}:`, error)
    }
  }
  
  private removeAppStyles(appName: string): void {
    const styleLink = document.querySelector(`link[data-app="${appName}"]`)
    if (styleLink) {
      styleLink.remove()
      console.log(`[MFA Host] Removed styles for ${appName}`)
    }
  }
  
  getMountedApps(): string[] {
    return Array.from(this.mountedApps.keys())
  }
  
  getLoadedApps(): string[] {
    return Array.from(this.apps.keys())
  }
}

// 싱글톤 인스턴스
let hostInstance: MicroFrontendHost | null = null

export function getMfaHost(): MicroFrontendHost {
  if (!hostInstance) {
    hostInstance = new MicroFrontendHost()
  }
  return hostInstance
}

export default MicroFrontendHost