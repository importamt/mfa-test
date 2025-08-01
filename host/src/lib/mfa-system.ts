// 🚀 엔터프라이즈급 하이브리드 MFA 시스템
import type { MFAConfig, LoadedApp, MicroAppModule, MFAMetrics } from '@/types/mfa'

export class HybridMFASystem {
  private config: MFAConfig
  private currentPageApps: LoadedApp[] = []
  private persistentAppsLoaded: boolean = false
  private isInitialLoad: boolean = true
  private metrics: MFAMetrics
  private preloadCache: Map<string, Promise<MicroAppModule>> = new Map()

  constructor() {
    this.config = window.MFA_CONFIG
    this.metrics = {
      loadTimes: {},
      errorCounts: {},
      activeApps: [],
      lastUpdated: Date.now()
    }
    
    // 글로벌 객체 등록
    window.MFA_METRICS = this.metrics
    window.__NEXT_MFA_HYBRID__ = true
    
    this.init()
  }

  async init(): Promise<void> {
    console.log('🚀 Hybrid MFA System 초기화 시작', {
      environment: this.config.environment,
      version: this.config.version,
      currentRoute: this.config.currentRoute
    })

    this.setupImportMap()
    this.setupPerformanceMonitoring()
    this.preloadCriticalApps()
    
    await this.loadPersistentApps()
    this.setupHybridRouting()
    
    // 초기 라우트 로드 (SSR에서 전환)
    await this.loadCurrentRoute()
    
    console.log('✅ Hybrid MFA System 초기화 완료')
  }

  setupImportMap(): void {
    // 서버에서 이미 렌더링된 import map이 있는지 확인
    const existingImportMap = document.querySelector('script[type="importmap"]')
    if (existingImportMap) {
      console.log('📦 서버 렌더링된 Import Map 사용:', existingImportMap.textContent)
      return
    }

    // 없으면 동적으로 생성 (fallback)
    const importMapScript = document.createElement('script')
    importMapScript.type = 'importmap'
    importMapScript.id = 'import-map-script'
    importMapScript.textContent = JSON.stringify({
      imports: this.config.importMap
    }, null, 2)
    
    document.head.appendChild(importMapScript)
    console.log('📦 Import Map 동적 설정 완료', this.config.importMap)
  }

  setupPerformanceMonitoring(): void {
    // 성능 모니터링 및 메트릭 수집
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('micro-app')) {
          this.metrics.loadTimes[entry.name] = entry.duration
        }
      })
    })
    
    observer.observe({ entryTypes: ['measure', 'navigation'] })
  }

  async preloadCriticalApps(): Promise<void> {
    // 중요한 앱들 사전 로딩
    const criticalApps = this.config.routingTable
      .filter(route => route.preload)
      .flatMap(route => route.apps)
    
    const preloadPromises = criticalApps.map(appName => 
      this.preloadApp(appName)
    )
    
    await Promise.allSettled(preloadPromises)
    console.log('⚡ Critical Apps 사전 로딩 완료', criticalApps)
  }

  async preloadApp(appName: string): Promise<void> {
    if (this.preloadCache.has(appName)) return
    
    const moduleUrl = this.config.importMap[appName]
    if (!moduleUrl) return
    
    const loadPromise = import(/* webpackIgnore: true */ moduleUrl).then(module => {
      performance.mark(`preload-${appName}-complete`)
      return module
    })
    
    this.preloadCache.set(appName, loadPromise)
    performance.mark(`preload-${appName}-start`)
  }

  setupHybridRouting(): void {
    // Next.js 라우터와 MFA 라우터 통합
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[data-mfa-route]')
      
      if (link) {
        e.preventDefault()
        const pathname = link.getAttribute('data-mfa-route')!
        this.navigate(pathname)
      }
    })

    // 브라우저 뒤로가기/앞으로가기
    window.addEventListener('popstate', () => {
      this.loadCurrentRoute()
    })

    // 첫 로드 이후 CSR 모드 활성화
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isInitialLoad = false
        console.log('🔄 CSR 모드 활성화')
      }, 100)
    })
  }

  async navigate(pathname: string): Promise<void> {
    // 첫 로드는 Next.js SSR, 이후는 순수 CSR
    if (this.isInitialLoad) {
      console.log('🌐 SSR Navigation:', pathname)
      window.location.href = pathname
      return
    }

    console.log('⚡ CSR Navigation:', pathname)
    history.pushState(null, '', pathname)
    
    // 클라이언트 사이드 SEO 업데이트
    this.updateClientSEO(pathname)
    
    // 마이크로앱 로딩
    await this.loadPageApps(pathname)
  }

  updateClientSEO(pathname: string): void {
    const routeConfig = this.config.routingTable.find(route =>
      route.pathnames.includes(pathname)
    )
    
    if (routeConfig) {
      const { meta } = routeConfig
      const userData = this.config.ssrData.user
      
      // 동적 제목 생성
      const title = userData 
        ? `${meta.title} - ${userData.name}님`
        : meta.title
      
      document.title = title
      this.updateMetaTag('description', meta.description)
      this.updateMetaTag('og:title', title, 'property')
      this.updateMetaTag('og:description', meta.description, 'property')
      
      console.log('🔍 SEO 업데이트 완료:', { title, description: meta.description })
    }
  }

  updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, name)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  async loadPageApps(pathname: string): Promise<void> {
    const startTime = performance.now()
    
    const routeConfig = this.config.routingTable.find(route =>
      route.pathnames.includes(pathname)
    )

    if (!routeConfig) {
      this.showDefaultPage()
      return
    }

    try {
      // 🚀 엔터프라이즈급 최적화: 차별적 로딩
      const newAppNames = routeConfig.apps
      const currentAppNames = this.currentPageApps.map(app => app.appName)

      // 동일한 앱들이 이미 로드되어 있으면 스킵
      const isSameApps = this.arraysEqual(newAppNames, currentAppNames)
      if (isSameApps) {
        console.log('♻️  앱 재사용: 리마운트 생략', newAppNames)
        return
      }

      // 제거할 앱들
      const appsToRemove = this.currentPageApps.filter(
        currentApp => !newAppNames.includes(currentApp.appName)
      )

      // 유지할 앱들  
      const appsToKeep = this.currentPageApps.filter(
        currentApp => newAppNames.includes(currentApp.appName)
      )

      // 새로 추가할 앱들
      const appsToAdd = newAppNames.filter(
        appName => !currentAppNames.includes(appName)
      )

      // 언마운트
      await this.unmountApps(appsToRemove)

      // 새 앱들 로드
      if (appsToAdd.length > 0) {
        const rootContainer = document.getElementById('mfa-root')
        if (!rootContainer) {
          console.error('❌ MFA root container를 찾을 수 없습니다')
          return
        }

        // 페이지 앱들을 위한 컨테이너 확인/생성
        let pageContainer = document.getElementById('mfa-page-apps')
        if (!pageContainer) {
          pageContainer = document.createElement('div')
          pageContainer.id = 'mfa-page-apps'
          rootContainer.appendChild(pageContainer)
        }

        const loadedApps = await this.loadAppsParallel(appsToAdd, pageContainer)
        appsToKeep.push(...loadedApps)
      }

      this.currentPageApps = appsToKeep
      
      const loadTime = performance.now() - startTime
      this.metrics.loadTimes[pathname] = loadTime
      this.metrics.activeApps = newAppNames
      this.metrics.lastUpdated = Date.now()

      console.log(`📈 페이지 로드 완료: ${pathname} (${loadTime.toFixed(2)}ms)`, {
        removed: appsToRemove.map(app => app.appName),
        kept: appsToKeep.map(app => app.appName),
        added: appsToAdd
      })

    } catch (error) {
      this.handleLoadError(pathname, error as Error)
    }
  }

  async loadAppsParallel(appNames: string[], container: HTMLElement): Promise<LoadedApp[]> {
    const loadPromises = appNames.map(async (appName) => {
      const startTime = performance.now()
      
      try {
        // 캐시된 모듈 먼저 확인
        let module: MicroAppModule
        if (this.preloadCache.has(appName)) {
          module = await this.preloadCache.get(appName)!
        } else {
          // 직접 URL로 로딩 (import map은 초기 로드에서만 작동)
          const moduleUrl = this.config.importMap[appName]
          console.log(`🔗 ${appName} 로딩:`, moduleUrl)
          module = await import(/* webpackIgnore: true */ moduleUrl)
        }

        // 컨테이너 생성
        const appContainer = document.createElement('div')
        appContainer.id = `mfa-app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        appContainer.className = 'mfa-app-container'
        appContainer.dataset.appName = appName
        container.appendChild(appContainer)

        // 마운트
        if (module.mount) {
          await module.mount(appContainer, {
            ssrData: this.config.ssrData,
            environment: this.config.environment
          })
        }

        const loadTime = performance.now() - startTime
        // performance.measure는 mark가 필요하므로 주석 처리
        // performance.measure(`load-${appName}`, { duration: loadTime })

        console.log(`✅ 앱 로드 완료: ${appName} (${loadTime.toFixed(2)}ms)`)

        return {
          appName,
          module,
          container: appContainer,
          version: module.version || 'unknown',
          loadTime
        }

      } catch (error) {
        this.metrics.errorCounts[appName] = (this.metrics.errorCounts[appName] || 0) + 1
        console.error(`❌ 앱 로드 실패: ${appName}`, error)
        throw error
      }
    })

    return Promise.all(loadPromises)
  }

  async unmountApps(apps: LoadedApp[]): Promise<void> {
    for (const { appName, module, container } of apps) {
      try {
        if (module.unmount) {
          await module.unmount()
        }
        container.remove()
        console.log(`🗑️  앱 언마운트: ${appName}`)
      } catch (error) {
        console.error(`❌ 언마운트 실패: ${appName}`, error)
      }
    }
  }

  async loadPersistentApps(): Promise<void> {
    if (this.persistentAppsLoaded) return

    const persistentApps = this.config.persistentApps || []
    
    if (persistentApps.length === 0) {
      console.log('🔧 영구 로드할 앱이 없습니다')
      return
    }

    const rootContainer = document.getElementById('mfa-root')
    if (!rootContainer) {
      console.error('❌ MFA root container를 찾을 수 없습니다')
      return
    }

    try {
      const loadPromises = persistentApps.map(async (appName) => {
        const moduleUrl = this.config.importMap[appName]
        if (!moduleUrl) {
          console.warn(`⚠️  Import map에 ${appName}이 없습니다`)
          return null
        }

        // 직접 URL로 로딩 (import map은 초기 로드에서만 작동)
        console.log(`🔗 ${appName} 로딩:`, moduleUrl)
        const module = await import(/* webpackIgnore: true */ moduleUrl)
        
        // 동적으로 컨테이너 생성
        const container = document.createElement('div')
        container.id = `mfa-persistent-${appName.replace('@mfa/', '')}`
        container.dataset.appName = appName
        
        rootContainer.appendChild(container)

        if (module.mount) {
          await module.mount(container, {
            ssrData: this.config.ssrData,
            environment: this.config.environment
          })
          console.log(`🔧 영구 앱 로드: ${appName}`)
        }

        return { appName, module, container }
      })

      await Promise.all(loadPromises)
      this.persistentAppsLoaded = true

    } catch (error) {
      console.error('❌ 영구 앱 로드 실패:', error)
    }
  }

  loadCurrentRoute(): void {
    const pathname = window.location.pathname
    this.loadPageApps(pathname)
  }

  showDefaultPage(): void {
    const rootContainer = document.getElementById('mfa-root')
    if (!rootContainer) return

    let pageContainer = document.getElementById('mfa-page-apps')
    if (!pageContainer) {
      pageContainer = document.createElement('div')
      pageContainer.id = 'mfa-page-apps'
      rootContainer.appendChild(pageContainer)
    }

    pageContainer.innerHTML = `
      <div>
        <h2>Enterprise MFA Platform</h2>
        <p>Next.js + Micro Frontend Architecture</p>
        <p>현재 경로: ${window.location.pathname}</p>
      </div>
    `
  }

  handleLoadError(pathname: string, error: Error): void {
    this.metrics.errorCounts[pathname] = (this.metrics.errorCounts[pathname] || 0) + 1
    
    const rootContainer = document.getElementById('mfa-root')
    if (!rootContainer) return

    let pageContainer = document.getElementById('mfa-page-apps')
    if (!pageContainer) {
      pageContainer = document.createElement('div')
      pageContainer.id = 'mfa-page-apps'
      rootContainer.appendChild(pageContainer)
    }

    pageContainer.innerHTML = `
      <div>
        <h2>앱 로드 실패</h2>
        <p>마이크로 앱을 불러오는 중 오류가 발생했습니다.</p>
        <pre>${error.message}</pre>
        <button onclick="window.location.reload()">다시 시도</button>
      </div>
    `
  }

  arraysEqual<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i])
  }

  // 개발자 도구용 디버그 메서드
  getMetrics(): MFAMetrics {
    return this.metrics
  }

  getConfig(): MFAConfig {
    return this.config
  }
}

// 글로벌 MFA 시스템 인스턴스
let mfaSystem: HybridMFASystem | null = null

export function initializeMFASystem(): HybridMFASystem {
  if (!mfaSystem) {
    mfaSystem = new HybridMFASystem()
  }
  return mfaSystem
}

export function getMFASystem(): HybridMFASystem | null {
  return mfaSystem
}