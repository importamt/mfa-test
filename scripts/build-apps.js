#!/usr/bin/env node

/**
 * 모든 remote 앱들과 framework를 빌드하고 host/public에 복사
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const apps = [
  { name: 'onboarding', path: 'apps/onboarding' },
  { name: 'login', path: 'apps/login' },
  { name: 'main', path: 'apps/main' },
  { name: 'header', path: 'apps/header' },
  { name: 'player', path: 'apps/player' }
]

const publicDir = path.join(__dirname, '..', 'host', 'public')
const appsDir = path.join(publicDir, 'apps')
const frameworkDir = path.join(publicDir, 'framework')

// 디렉토리 생성
if (!fs.existsSync(appsDir)) {
  fs.mkdirSync(appsDir, { recursive: true })
}
if (!fs.existsSync(frameworkDir)) {
  fs.mkdirSync(frameworkDir, { recursive: true })
}

console.log('🏗️  Building all apps...\n')

// 각 앱 빌드
for (const app of apps) {
  console.log(`📦 Building ${app.name}...`)
  try {
    execSync(`pnpm --filter @mfa/${app.name} build`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    
    // 빌드된 파일을 public으로 복사
    const distPath = path.join(__dirname, '..', app.path, 'dist')
    if (fs.existsSync(distPath)) {
      const mainFile = path.join(distPath, `${app.name}-v1.js`)
      if (fs.existsSync(mainFile)) {
        const destFile = path.join(appsDir, `${app.name}.js`)
        fs.copyFileSync(mainFile, destFile)
        console.log(`✅ ${app.name} built and copied to ${destFile}`)
      } else {
        console.warn(`⚠️  ${app.name}: ${app.name}-v1.js not found in dist`)
      }
    } else {
      console.warn(`⚠️  ${app.name}: dist directory not found`)
    }
  } catch (error) {
    console.error(`❌ Failed to build ${app.name}:`, error.message)
  }
  console.log('')
}

// Framework 빌드
console.log('📦 Building framework...')
try {
  execSync('pnpm --filter @mfa/framework build', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  
  // 빌드된 파일을 public으로 복사
  const distPath = path.join(__dirname, '..', 'shared', 'dist')
  if (fs.existsSync(distPath)) {
    const mainFile = path.join(distPath, 'mfa-framework.js')
    if (fs.existsSync(mainFile)) {
      const destFile = path.join(frameworkDir, 'main.js')
      fs.copyFileSync(mainFile, destFile)
      console.log(`✅ Framework built and copied to ${destFile}`)
    } else {
      console.warn('⚠️  Framework: mfa-framework.js not found in dist')
    }
  } else {
    console.warn('⚠️  Framework: dist directory not found')
  }
} catch (error) {
  console.error('❌ Failed to build framework:', error.message)
}

console.log('\n✨ Build complete!')