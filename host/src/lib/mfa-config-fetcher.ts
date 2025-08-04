// MFA 설정을 가져오는 심플한 fetcher
import type { ImportMap, RoutingTableEntry } from '@/types/mfa'

interface MFAConfig {
  importMap: ImportMap
  routingTable: RoutingTableEntry[]
  persistentApps: string[]
  frameworkUrl?: string
}

// 배포 관리 시스템 API (나중에 실제 URL로 변경)
const DEPLOYMENT_API_URL = process.env.DEPLOYMENT_API_URL || 'http://localhost:3000/api/mfa-deployment'

// MFA 설정 가져오기 (Next.js fetch 캐싱 활용)
export async function fetchMFAConfig(): Promise<MFAConfig> {
  try {
    // 현재는 내부 API 사용 (개발 서버 체크 포함)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/mfa-config`, {
      cache: 'no-store' // 개발 환경에서는 캐싱 안함
    })
    const data = await res.json()
    
    // 실제 배포 관리 시스템 API가 준비되면 이 부분을 대체
    // const res = await fetch(DEPLOYMENT_API_URL, {
    //   next: { revalidate: 60 } // 1분 캐싱
    // })
    // return await res.json()

    return {
      importMap: data.apps,
      frameworkUrl: data.apps['@mfa/framework'] || '/shared/shared-v1.js',
      routingTable: [
        {
          pathnames: ['/'],
          apps: ['@mfa/micro-app-1'],
          meta: {
            title: 'Home',
            description: 'Enterprise MFA Platform Home'
          }
        },
        {
          pathnames: ['/main'],
          apps: ['@mfa/micro-app-1'],
          meta: {
            title: 'Main Dashboard',
            description: 'Main application dashboard'
          }
        },
        {
          pathnames: ['/dashboard'],
          apps: ['@mfa/micro-app-2'],
          meta: {
            title: 'Analytics Dashboard',
            description: 'Business analytics and metrics'
          },
          preload: true
        },
        {
          pathnames: ['/profile'],
          apps: ['@mfa/micro-app-1', '@mfa/micro-app-2'],
          meta: {
            title: 'User Profile',
            description: 'Manage your profile and settings'
          }
        }
      ],
      persistentApps: ['@mfa/header-app']
    }
  } catch (error) {
    console.error('Failed to fetch MFA config:', error)
    throw error
  }
}