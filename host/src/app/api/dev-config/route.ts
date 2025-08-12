import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    // .mfa-dev-config.json 읽기
    const configPath = path.join(process.cwd(), '..', '.mfa-dev-config.json')
    const data = await fs.readFile(configPath, 'utf8')
    const config = JSON.parse(data)
    
    return NextResponse.json(config)
  } catch (error) {
    // 파일이 없거나 에러시 기본값
    return NextResponse.json({
      lastSelected: [],
      apps: {},
      framework: { port: 5173 }
    })
  }
}