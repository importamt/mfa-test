class MicroFrontendHost {
    constructor() {
        this.config = window.MFA_CONFIG;
        this.currentPageApps = [];
        this.persistentAppsLoaded = false;
        this.sharedModuleLoaded = false;
        this.dynamicImportMap = this.generateDynamicImportMap();
        this.init();
    }

    async init() {
        this.setupImportMap();
        await this.preloadSharedModule();
        await this.loadPersistentApps();
        this.setupRouting();
        this.loadCurrentRoute();
    }

    async preloadSharedModule() {
        if (this.sharedModuleLoaded) return;
        
        try {
            console.log('Pre-loading shared module...');
            const sharedUrl = this.dynamicImportMap['@mfa/shared'];
            const sharedModule = await import(sharedUrl);
            
            // 전역 객체에 shared 모듈 등록
            window.__MFA_SHARED__ = sharedModule;
            this.sharedModuleLoaded = true;
            
            console.log('Shared module pre-loaded successfully');
        } catch (error) {
            console.error('Failed to pre-load shared module:', error);
        }
    }

    generateDynamicImportMap() {
        const importMap = {};
        
        // 공유 라이브러리 추가 (React, ReactDOM 등)
        Object.assign(importMap, this.config.sharedLibraries);
        
        // 모든 앱에 대해 개발/프로덕션 URL 결정
        const allApps = [
            ...this.config.persistentApps,
            ...this.config.routingTable.flatMap(route => route.apps)
        ];
        
        const uniqueApps = [...new Set(allApps)];
        
        uniqueApps.forEach(appName => {
            // 개발 중인 앱인지 확인
            const isDevelopmentApp = this.config.developmentApps.includes(appName);
            
            if (isDevelopmentApp) {
                // 개발 중인 앱은 개발 서버 URL 사용 (HMR 적용)
                importMap[appName] = this.config.developmentUrls[appName];
            } else {
                // 개발 중이 아닌 앱은 프로덕션 빌드 URL 사용
                importMap[appName] = this.config.productionBaseUrls[appName];
            }
        });
        
        return importMap;
    }

    setupImportMap() {
        // 기존 import map 스크립트 제거
        const existingScript = document.getElementById('import-map-script');
        if (existingScript) {
            existingScript.remove();
        }

        // 새로운 import map 스크립트 생성
        const importMapScript = document.createElement('script');
        importMapScript.type = 'importmap';
        importMapScript.id = 'import-map-script';
        importMapScript.textContent = JSON.stringify({
            imports: this.dynamicImportMap
        });
        
        document.head.appendChild(importMapScript);
        console.log('동적 Import map 설정 완료:', this.dynamicImportMap);
        console.log('개발 중인 앱:', this.config.developmentApps);
    }

    async loadPersistentApps() {
        if (this.persistentAppsLoaded) return;

        try {
            // shared가 아닌 앱들만 로드 (shared는 이미 preloadSharedModule에서 처리)
            const appsToLoad = this.config.persistentApps.filter(app => app !== '@mfa/shared');
            
            const loadPromises = appsToLoad.map(async (appName) => {
                const moduleUrl = this.dynamicImportMap[appName];
                const module = await import(moduleUrl);
                return { appName, module };
            });

            const results = await Promise.all(loadPromises);
            
            // shared는 먼저 마운트 (Global Provider 설정)
            if (this.config.persistentApps.includes('@mfa/shared')) {
                const sharedModule = window.__MFA_SHARED__;
                if (sharedModule && sharedModule.mount) {
                    const container = document.getElementById('app-root');
                    sharedModule.mount(container);
                    console.log('Shared Global Provider 마운트 완료');
                }
            }
            
            // 나머지 영구 앱들 마운트
            results.forEach(({ appName, module }) => {
                const containerId = this.getContainerIdForApp(appName);
                const container = document.getElementById(containerId);
                
                if (container && module.mount) {
                    module.mount(container);
                    console.log(`영구 앱 로드 완료: ${appName}`);
                }
            });

            this.persistentAppsLoaded = true;
        } catch (error) {
            console.error('영구 앱 로드 실패:', error);
        }
    }

    getContainerIdForApp(appName) {
        const containerMap = {
            '@mfa/shared': 'app-root', // shared는 전체 앱을 감싸는 Provider
            '@mfa/header-app': 'header-container',
            '@mfa/pip-app': 'pip-container'
        };
        return containerMap[appName] || 'unknown-container';
    }

    async loadPageApps(pathname) {
        // 기존 페이지 앱들 언마운트
        await this.unmountCurrentPageApps();

        // 현재 경로에 맞는 앱들 찾기
        const routeConfig = this.config.routingTable.find(route => 
            route.pathnames.includes(pathname)
        );

        if (!routeConfig) {
            this.showDefaultPage();
            return;
        }

        try {
            const container = document.getElementById('page-apps-container');
            container.innerHTML = '';

            // 페이지 앱들을 병렬로 로드
            const loadPromises = routeConfig.apps.map(async (appName, index) => {
                const moduleUrl = this.dynamicImportMap[appName];
                const module = await import(moduleUrl);
                return { appName, module, index };
            });

            const results = await Promise.all(loadPromises);
            
            results.forEach(({ appName, module, index }) => {
                const appContainer = document.createElement('div');
                appContainer.id = `page-app-${index}`;
                appContainer.className = 'page-app-container';
                container.appendChild(appContainer);

                if (module.mount) {
                    module.mount(appContainer);
                    this.currentPageApps.push({ appName, module, container: appContainer });
                    console.log(`페이지 앱 로드 완료: ${appName}`);
                }
            });

        } catch (error) {
            console.error('페이지 앱 로드 실패:', error);
            this.showErrorPage(error);
        }
    }

    async unmountCurrentPageApps() {
        for (const { module } of this.currentPageApps) {
            if (module.unmount) {
                await module.unmount();
            }
        }
        this.currentPageApps = [];
    }

    setupRouting() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.route) {
                e.preventDefault();
                this.navigate(e.target.dataset.route);
            }
        });

        window.addEventListener('popstate', () => {
            this.loadCurrentRoute();
        });
    }

    navigate(pathname) {
        history.pushState(null, '', pathname);
        this.loadCurrentRoute();
    }

    loadCurrentRoute() {
        const pathname = window.location.pathname;
        this.loadPageApps(pathname);
    }

    showDefaultPage() {
        const container = document.getElementById('page-apps-container');
        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>MFA 플랫폼에 오신 것을 환영합니다</h2>
                <p>상단 네비게이션에서 페이지를 선택해보세요.</p>
                <p>현재 경로: ${window.location.pathname}</p>
            </div>
        `;
    }

    showErrorPage(error) {
        const container = document.getElementById('page-apps-container');
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: red;">
                <h2>앱 로드 실패</h2>
                <p>페이지 앱을 불러오는 중 오류가 발생했습니다.</p>
                <pre>${error.message}</pre>
            </div>
        `;
    }
}

new MicroFrontendHost();