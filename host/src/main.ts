import type { MFAConfig } from '@mfa/shared'

interface LoadedApp {
  appName: string
  module: any
  container: HTMLElement
}

class MicroFrontendHost {
    private config: MFAConfig
    private currentPageApps: LoadedApp[] = []
    private persistentAppsLoaded: boolean = false
    private dynamicImportMap: Record<string, string>

    constructor() {
        this.config = window.MFA_CONFIG
        this.dynamicImportMap = this.generateDynamicImportMap()
        this.init()
    }

    async init(): Promise<void> {
        this.setupImportMap()
        await this.loadPersistentApps()
        this.setupRouting()
        this.loadCurrentRoute()
    }


    generateDynamicImportMap(): Record<string, string> {
        const importMap: Record<string, string> = {}
        
        // 공유 라이브러리 추가 (React, ReactDOM 등)
        Object.assign(importMap, this.config.sharedLibraries)
        
        // 모든 앱에 대해 개발/프로덕션 URL 결정
        const allApps = [
            ...this.config.persistentApps,
            ...this.config.routingTable.flatMap(route => route.apps)
        ]
        
        const uniqueApps = [...new Set(allApps)]
        
        uniqueApps.forEach(appName => {
            // 개발 중인 앱인지 확인
            const isDevelopmentApp = this.config.developmentApps.includes(appName)
            
            if (isDevelopmentApp) {
                // 개발 중인 앱은 개발 서버 URL 사용 (HMR 적용)
                importMap[appName] = this.config.developmentUrls[appName]
            } else {
                // 개발 중이 아닌 앱은 프로덕션 빌드 URL 사용
                importMap[appName] = this.config.productionBaseUrls[appName]
            }
        })
        
        return importMap
    }

    setupImportMap(): void {
        // 기존 import map 스크립트 제거
        const existingScript = document.getElementById('import-map-script')
        if (existingScript) {
            existingScript.remove()
        }

        // 새로운 import map 스크립트 생성
        const importMapScript = document.createElement('script')
        importMapScript.type = 'importmap'
        importMapScript.id = 'import-map-script'
        importMapScript.textContent = JSON.stringify({
            imports: this.dynamicImportMap
        })
        
        document.head.appendChild(importMapScript)
        console.log('동적 Import map 설정 완료:', this.dynamicImportMap)
        console.log('개발 중인 앱:', this.config.developmentApps)
    }

    async loadPersistentApps(): Promise<void> {
        if (this.persistentAppsLoaded) return

        try {
            const loadPromises = this.config.persistentApps.map(async (appName) => {
                const moduleUrl = this.dynamicImportMap[appName]
                const module = await import(moduleUrl)
                return { appName, module }
            })

            const results = await Promise.all(loadPromises)
            
            // 영구 앱들 마운트
            results.forEach(({ appName, module }) => {
                const containerId = this.getContainerIdForApp(appName)
                const container = document.getElementById(containerId)
                
                if (container && module.mount) {
                    module.mount(container)
                    console.log(`영구 앱 로드 완료: ${appName}`)
                }
            })

            this.persistentAppsLoaded = true
        } catch (error) {
            console.error('영구 앱 로드 실패:', error)
        }
    }

    getContainerIdForApp(appName: string): string {
        const containerMap: Record<string, string> = {
            '@mfa/header-app': 'header-container',
            '@mfa/pip-app': 'pip-container'
        }
        return containerMap[appName] || 'unknown-container'
    }

    async loadPageApps(pathname: string): Promise<void> {
        // 현재 경로에 맞는 앱들 찾기
        const routeConfig = this.config.routingTable.find(route => 
            route.pathnames.includes(pathname)
        )

        if (!routeConfig) {
            await this.unmountCurrentPageApps()
            this.showDefaultPage()
            return
        }

        const newAppNames = routeConfig.apps
        const currentAppNames = this.currentPageApps.map(app => app.appName)

        // 동일한 앱 목록인지 확인
        const isSameApps = newAppNames.length === currentAppNames.length && 
                          newAppNames.every(appName => currentAppNames.includes(appName)) &&
                          currentAppNames.every(appName => newAppNames.includes(appName))

        if (isSameApps) {
            console.log('동일한 앱들이 이미 마운트되어 있음. 리마운트 생략.')
            return
        }

        // 제거할 앱들 언마운트
        const appsToRemove = this.currentPageApps.filter(
            currentApp => !newAppNames.includes(currentApp.appName)
        )
        
        for (const { module, container } of appsToRemove) {
            if (module.unmount) {
                await module.unmount()
            }
            container.remove()
        }

        // 유지할 앱들
        const appsToKeep = this.currentPageApps.filter(
            currentApp => newAppNames.includes(currentApp.appName)
        )

        // 새로 추가할 앱들
        const appsToAdd = newAppNames.filter(
            appName => !currentAppNames.includes(appName)
        )

        try {
            const container = document.getElementById('page-apps-container')
            if (!container) return

            // 새로운 앱들을 병렬로 로드
            if (appsToAdd.length > 0) {
                const loadPromises = appsToAdd.map(async (appName) => {
                    const moduleUrl = this.dynamicImportMap[appName]
                    const module = await import(moduleUrl)
                    return { appName, module }
                })

                const results = await Promise.all(loadPromises)
                
                results.forEach(({ appName, module }) => {
                    const appContainer = document.createElement('div')
                    appContainer.id = `page-app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    appContainer.className = 'page-app-container'
                    container.appendChild(appContainer)

                    if (module.mount) {
                        module.mount(appContainer)
                        appsToKeep.push({ appName, module, container: appContainer })
                        console.log(`새 페이지 앱 로드 완료: ${appName}`)
                    }
                })
            }

            // 현재 앱 목록 업데이트
            this.currentPageApps = appsToKeep

        } catch (error) {
            console.error('페이지 앱 로드 실패:', error)
            this.showErrorPage(error as Error)
        }
    }

    async unmountCurrentPageApps(): Promise<void> {
        for (const { module } of this.currentPageApps) {
            if (module.unmount) {
                await module.unmount()
            }
        }
        this.currentPageApps = []
    }

    setupRouting(): void {
        document.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement
            if (target.dataset.route) {
                e.preventDefault()
                this.navigate(target.dataset.route)
            }
        })

        window.addEventListener('popstate', () => {
            this.loadCurrentRoute()
        })
    }

    navigate(pathname: string): void {
        history.pushState(null, '', pathname)
        this.loadCurrentRoute()
    }

    loadCurrentRoute(): void {
        const pathname = window.location.pathname
        this.loadPageApps(pathname)
    }

    showDefaultPage(): void {
        const container = document.getElementById('page-apps-container')
        if (!container) return
        
        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>MFA 플랫폼에 오신 것을 환영합니다</h2>
                <p>상단 네비게이션에서 페이지를 선택해보세요.</p>
                <p>현재 경로: ${window.location.pathname}</p>
            </div>
        `
    }

    showErrorPage(error: Error): void {
        const container = document.getElementById('page-apps-container')
        if (!container) return
        
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: red;">
                <h2>앱 로드 실패</h2>
                <p>페이지 앱을 불러오는 중 오류가 발생했습니다.</p>
                <pre>${error.message}</pre>
            </div>
        `
    }
}

new MicroFrontendHost()