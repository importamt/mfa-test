// 🚀 동적 라우트 레지스트리 - 팀 독립성 확보
export interface MicroAppManifest {
  name: string
  version: string
  routes: string[]
  entry: string
  seo: {
    title: string
    description: string
    keywords?: string[]
  }
  team: string
  environment: 'development' | 'staging' | 'production'
}

export class RouteRegistry {
  private manifests: MicroAppManifest[] = []
  
  // 개발시: 로컬 파일에서 로드
  // 프로덕션: CDN/API에서 로드
  async loadManifests(): Promise<void> {
    try {
      // 각 팀의 manifest를 병렬로 로드
      const manifestUrls = [
        '/api/manifests/team-a',
        '/api/manifests/team-b',
        '/api/manifests/team-c'
      ]
      
      const responses = await Promise.all(
        manifestUrls.map(url => 
          fetch(url).catch(err => {
            console.warn(`Manifest 로드 실패: ${url}`, err)
            return { json: () => [] }
          })
        )
      )
      
      const manifests = await Promise.all(
        responses.map(res => res.json())
      )
      
      this.manifests = manifests.flat()
      console.log('📋 로드된 마이크로앱 manifest:', this.manifests.length)
      
    } catch (error) {
      console.error('❌ Manifest 로드 실패:', error)
      // fallback to static config
      this.manifests = await this.getStaticManifests()
    }
  }
  
  // 경로로 manifest 찾기
  findManifestByPath(pathname: string): MicroAppManifest | null {
    return this.manifests.find(manifest =>
      manifest.routes.some(route => 
        pathname.startsWith(route) || 
        new RegExp(route.replace('*', '.*')).test(pathname)
      )
    ) || null
  }
  
  // Import Map 생성
  generateImportMap(): Record<string, string> {
    const importMap: Record<string, string> = {}
    
    this.manifests.forEach(manifest => {
      importMap[manifest.name] = manifest.entry
    })
    
    return importMap
  }
  
  // 라우팅 테이블 생성
  generateRoutingTable() {
    return this.manifests.map(manifest => ({
      pathnames: manifest.routes,
      apps: [manifest.name],
      meta: manifest.seo,
      team: manifest.team,
      preload: false,
      cache: true
    }))
  }
  
  private async getStaticManifests(): Promise<MicroAppManifest[]> {
    // fallback static configuration
    return [
      {
        name: '@mfa/micro-app-1',
        version: '1.0.0',
        routes: ['/main', '/home', '/'],
        entry: '/apps/micro-app-1-v1.js',
        seo: {
          title: '메인 페이지',
          description: 'Enterprise MFA Platform 메인 대시보드'
        },
        team: 'platform',
        environment: 'development'
      },
      {
        name: '@mfa/micro-app-2', 
        version: '1.0.0',
        routes: ['/profile', '/dashboard'],
        entry: '/apps/micro-app-2-v1.js',
        seo: {
          title: '사용자 대시보드',
          description: '사용자 프로필 및 대시보드'
        },
        team: 'user-experience',
        environment: 'development'
      }
    ]
  }
}

// 싱글톤 인스턴스
export const routeRegistry = new RouteRegistry()