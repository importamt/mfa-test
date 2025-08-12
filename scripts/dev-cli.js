#!/usr/bin/env node

/**
 * MFA 개발 서버 CLI
 * Mock API에서 앱 목록을 가져와 선택하고
 * 포트 정보를 입력받아 개발 서버 실행
 */

import inquirer from 'inquirer'
import chalk from 'chalk'
import { spawn } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_FILE = path.join(__dirname, '..', '.mfa-dev-config.json')

// Mock API 시뮬레이션 (실제로는 fetch로 가져올 내용)
async function fetchMfaSystemConfig() {
  console.log(chalk.cyan('📡 MFA 시스템 설정을 가져오는 중...'))
  
  // 실제 API 호출 시뮬레이션 딜레이
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    framework: {
      id: '@mfa/framework',
      name: 'framework',
      displayName: 'Shared Framework',
      defaultPort: 5173
    },
    apps: [
      {
        id: '@mfa/onboarding',
        name: 'onboarding',
        displayName: '온보딩 화면',
        type: 'page',
        defaultPort: 4001
      },
      {
        id: '@mfa/login',
        name: 'login',
        displayName: '로그인 화면',
        type: 'page',
        defaultPort: 4002
      },
      {
        id: '@mfa/main',
        name: 'main',
        displayName: '메인 화면',
        type: 'page',
        defaultPort: 4003
      },
      {
        id: '@mfa/header',
        name: 'header',
        displayName: '헤더 (항상 표시)',
        type: 'persistent',
        defaultPort: 4004
      },
      {
        id: '@mfa/player',
        name: 'player',
        displayName: '플레이어 (항상 마운트)',
        type: 'persistent',
        defaultPort: 4005
      }
    ]
  }
}

// 설정 파일 읽기
async function readConfig() {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return { lastSelected: [], apps: {} }
  }
}

// 설정 파일 저장
async function saveConfig(config) {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2))
}

// 포트 입력받기 (저장된 포트가 없을 때만)
async function getPortForApp(app, savedPort) {
  // 이미 저장된 포트가 있으면 그대로 사용
  if (savedPort) {
    console.log(chalk.gray(`  ${app.displayName}: 포트 ${savedPort} 사용`))
    return savedPort
  }
  
  // 저장된 포트가 없을 때만 입력받기
  const { port } = await inquirer.prompt([
    {
      type: 'input',
      name: 'port',
      message: `${app.displayName}의 포트 번호:`,
      default: app.defaultPort,
      validate: (input) => {
        const num = parseInt(input)
        if (isNaN(num) || num < 1024 || num > 65535) {
          return '유효한 포트 번호를 입력하세요 (1024-65535)'
        }
        return true
      }
    }
  ])
  return parseInt(port)
}

// 메인 CLI 함수
async function main() {
  console.log(chalk.bold.blue('\n🚀 MFA 개발 서버 설정\n'))
  
  // Mock API에서 설정 가져오기
  const systemConfig = await fetchMfaSystemConfig()
  const config = await readConfig()
  
  // 앱 선택
  const choices = systemConfig.apps.map(app => ({
    name: `${app.displayName} ${app.type === 'persistent' ? chalk.yellow('(항상 마운트)') : chalk.green('(페이지)')}`,
    value: app.name,
    checked: config.lastSelected?.includes(app.name)
  }))
  
  const { selectedApps } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedApps',
      message: '개발 서버로 실행할 앱을 선택하세요:',
      choices,
      validate: (answer) => {
        if (answer.length < 1) {
          return '최소 하나 이상의 앱을 선택하세요'
        }
        return true
      }
    }
  ])
  
  // Framework는 항상 빌드된 파일 사용
  const useFrameworkDev = false
  
  // 포트 설정 초기화
  if (!config.apps) config.apps = {}
  
  // 새로운 포트 설정이 필요한지 확인
  let needsPortConfig = false
  
  // 선택된 앱들의 포트 확인
  for (const appName of selectedApps) {
    if (!config.apps[appName]?.port) {
      needsPortConfig = true
      break
    }
  }
  
  // 포트 설정이 필요한 경우에만 섹션 표시
  if (needsPortConfig) {
    console.log(chalk.cyan('\n📝 새로운 앱의 포트 설정\n'))
  } else {
    console.log(chalk.gray('\n✅ 모든 앱의 포트가 이미 설정되어 있습니다\n'))
  }
  
  // 각 앱의 포트 설정
  for (const appName of selectedApps) {
    const app = systemConfig.apps.find(a => a.name === appName)
    const savedPort = config.apps[appName]?.port
    const port = await getPortForApp(app, savedPort)
    
    if (!config.apps[appName]) config.apps[appName] = {}
    config.apps[appName].port = port
  }
  
  // 설정 저장
  config.lastSelected = selectedApps
  config.lastRun = new Date().toISOString()
  await saveConfig(config)
  
  console.log(chalk.green('\n✅ 설정이 저장되었습니다'))
  
  // 실행 요약 표시
  console.log(chalk.bold('\n📋 실행 요약:\n'))
  console.log(chalk.white('  Host: ') + chalk.cyan('http://localhost:3000'))
  console.log(chalk.white('  Framework: ') + chalk.gray('빌드된 파일 사용 (/framework/main.js)'))
  
  selectedApps.forEach(appName => {
    const app = systemConfig.apps.find(a => a.name === appName)
    const port = config.apps[appName].port
    const color = app.type === 'persistent' ? chalk.yellow : chalk.green
    console.log(chalk.white(`  ${app.displayName}: `) + color(`http://localhost:${port}`))
  })
  
  console.log()
  
  // 실행 명령 생성
  const commands = []
  
  // Host 앱은 항상 실행 (Next.js)
  commands.push({
    name: 'host',
    command: 'pnpm --filter host dev',
    color: 'blue'
  })
  
  // Framework는 빌드된 파일 사용 (개발 서버 실행하지 않음)
  
  // 선택된 앱들의 개발 서버
  for (const appName of selectedApps) {
    // 앱 이름이 이미 패키지 이름 형식과 일치
    const packageName = `@mfa/${appName}`
    
    commands.push({
      name: appName,
      command: `pnpm --filter ${packageName} dev`,
      color: 'green'
    })
  }
  
  // concurrently 명령 생성
  const concurrentlyArgs = commands.map(cmd => 
    `"${cmd.command}"`
  ).join(' ')
  
  const names = commands.map(cmd => cmd.name).join(',')
  const colors = commands.map(cmd => cmd.color).join(',')
  
  const finalCommand = `npx concurrently -n "${names}" -c "${colors}" ${concurrentlyArgs}`
  
  console.log(chalk.bold('실행 명령:'))
  console.log(chalk.gray(finalCommand))
  console.log()
  
  // 실행
  const child = spawn(finalCommand, [], {
    shell: true,
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  
  child.on('exit', (code) => {
    process.exit(code)
  })
}

// 실행
main().catch(console.error)