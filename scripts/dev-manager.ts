#!/usr/bin/env node

import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import { spawn, ChildProcess } from 'child_process'
import { fileURLToPath } from 'url'
import { MFA_APPS_CONFIG, MfaConfigUtils } from '@/config/mfa-apps.config'
import type { AppListItem } from '@/types/mfa-apps'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 중앙 설정에서 앱 정보 가져오기
const MICRO_APPS: AppListItem[] = MfaConfigUtils.getAppsList()

const CONFIG_FILE = path.join(__dirname, '../.mfa-dev-config.json')

interface DevConfig {
  lastSelected: string[]
  lastRun?: string
}

interface ProcessInfo {
  name: string
  process: ChildProcess
}

interface ParsedArgs {
  selectedApps: string[]
  skipPrompt: boolean
}

// 설정 파일 읽기/저장
function loadConfig(): DevConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
    }
  } catch (error) {
    console.warn('설정 파일 읽기 실패:', (error as Error).message)
  }
  return { lastSelected: [] }
}

function saveConfig(config: DevConfig): void {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
  } catch (error) {
    console.warn('설정 파일 저장 실패:', (error as Error).message)
  }
}

// CLI 인자 파싱
function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2)
  const appsIndex = args.findIndex(arg => arg === '--apps')
  
  if (appsIndex !== -1 && args[appsIndex + 1]) {
    const selectedApps = args[appsIndex + 1].split(',').map(name => name.trim())
    return { selectedApps, skipPrompt: true }
  }
  
  return { selectedApps: [], skipPrompt: false }
}

// 인터랙티브 앱 선택
async function selectApps(lastSelected: string[] = []): Promise<string[]> {
  console.log('\n🚀 MFA 개발 서버 관리자\n')
  
  // 마이크로 앱 목록 생성
  const choices = [
    ...MICRO_APPS.map(app => ({
      name: `${app.displayName} - ${app.name} (포트: ${app.devPort})`,
      value: app.name,
      checked: lastSelected.includes(app.name)
    })),
    // Framework를 마지막 선택지로 추가
    {
      name: `🔧 MFA Framework - framework (포트: 3004)`,
      value: 'framework',
      checked: lastSelected.includes('framework')
    }
  ]

  const { selectedApps } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedApps',
      message: '개발할 마이크로 앱을 선택하세요:',
      choices,
      validate: (input: string[]) => {
        if (input.length === 0) {
          return '최소 하나의 앱을 선택해주세요.'
        }
        return true
      }
    }
  ])

  return selectedApps
}

// 개발 서버 시작
function startDevServers(selectedApps: string[]): void {
  console.log('\n📦 선택된 앱들의 개발 서버를 시작합니다...\n')
  
  const processes: ProcessInfo[] = []
  
  // Framework 서버 시작 (선택된 경우)
  if (selectedApps.includes('framework')) {
    console.log('🔧 Framework 서버 시작 중... (포트: 3004)')
    const frameworkProcess = spawn('pnpm', ['--filter', '@mfa/framework', 'dev'], {
      stdio: 'inherit',
      shell: true
    })
    processes.push({ name: 'framework', process: frameworkProcess })
  }

  // Host 서버 시작
  console.log('🏠 Host 서버 시작 중... (포트: 3000)')
  const hostProcess = spawn('pnpm', ['--filter', 'host', 'dev'], {
    stdio: 'inherit',
    shell: true
  })
  processes.push({ name: 'host', process: hostProcess })

  // 선택된 마이크로 앱들 개발 서버 시작
  selectedApps.forEach(appName => {
    const app = MICRO_APPS.find(a => a.name === appName)
    if (app) {
      console.log(`📱 ${app.displayName} (${app.name}) 개발 서버 시작 중... (포트: ${app.devPort})`)
      // package.json의 실제 name 형식으로 사용
      const packageName = `@mfa/${app.name}`
      const appProcess = spawn('pnpm', ['--filter', packageName, 'dev'], {
        stdio: 'inherit',
        shell: true
      })
      processes.push({ name: app.name, process: appProcess })
    }
  })

  // 종료 시그널 처리
  process.on('SIGINT', () => {
    console.log('\n\n🛑 개발 서버들을 종료하는 중...')
    processes.forEach(({ name, process }) => {
      console.log(`   ${name} 서버 종료 중...`)
      process.kill('SIGTERM')
    })
    
    setTimeout(() => {
      console.log('✅ 모든 서버가 종료되었습니다.')
      process.exit(0)
    }, 1000)
  })

  console.log('\n✅ 개발 서버들이 시작되었습니다!')
  console.log('📋 실행 중인 서버들:')
  console.log('   🏠 Host: http://localhost:3000')
  
  selectedApps.forEach(appName => {
    if (appName === 'framework') {
      console.log('   🔧 Framework: http://localhost:3004')
    } else {
      const app = MICRO_APPS.find(a => a.name === appName)
      if (app) {
        console.log(`   📱 ${app.displayName}: http://localhost:${app.devPort}`)
      }
    }
  })
  console.log('\n⚠️  Ctrl+C로 모든 서버를 종료할 수 있습니다.\n')
}

// 메인 실행 함수
async function main(): Promise<void> {
  try {
    const config = loadConfig()
    const { selectedApps, skipPrompt } = parseArgs()
    
    let appsToStart = selectedApps
    
    if (!skipPrompt) {
      appsToStart = await selectApps(config.lastSelected)
    }
    
    if (appsToStart.length === 0) {
      console.log('선택된 앱이 없습니다. 종료합니다.')
      return
    }
    
    // 선택 내역 저장
    saveConfig({ 
      lastSelected: appsToStart,
      lastRun: new Date().toISOString()
    })
    
    startDevServers(appsToStart)
    
  } catch (error) {
    console.error('❌ 오류 발생:', (error as Error).message)
    process.exit(1)
  }
}

main()