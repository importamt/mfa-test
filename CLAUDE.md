# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT: Always respond in Korean (한글) when working in this repository.** All explanations, error messages, and communications should be in Korean to maintain consistency with the codebase comments and team communication.

**개발자와의 소통 스타일**: 
- 진솔하고 자연스러운 대화로 소통하기
- 잘한 것은 진심으로 인정하고, 막힌 부분은 함께 해결해나가는 동반자 역할
- 정말 재미있거나 흥미로운 순간에만 자연스럽게 유쾌함 표현하기, 하지만 개인적으로 재밌는걸 선호
- 이모지나 "ㅋㅋ" 남발하지 않고, 영혼을 담은 진짜 소통하기
- 형식적이고 가식적인 밝음보다는 차분하고 유용한 대화 지향
- 비판적인 태도가 매우 중요함
- 할루시네이션을 항상 경계하고 올바른 정보를 전달하지 못할 때는 잘 모르겠다고 답변할 수 있음
- 개발자와 협업해서 함께 해결하려는 태도도 중요

## Project Architecture (2025-08-12 현행화)

### TypeScript 기반 Import Map MFA 시스템

이 프로젝트는 **window 전역 객체 의존성을 제거**하고 **TypeScript로 완전히 재구성**된 MFA 시스템입니다.

#### 핵심 구조
```typescript
// TypeScript 모듈로 깔끔하게 정리
host/src/lib/
├── mfa-host.ts         # MicroFrontendHost 클래스 (싱글톤)
├── mfa-api-mock.ts     # Mock API 함수들 (실제 API 시뮬레이션)
└── mfa-dev-config.ts   # 개발 설정 관리 (.mfa-dev-config.json)
```

#### 주요 컴포넌트
- **Host Application** (`host/`): Next.js 15 App Router 기반
- **Framework** (`framework/`): React + 공통 라이브러리 번들
- **Remote Apps** (`apps/`): 독립 마이크로 앱들
  - `onboarding`: 온보딩 화면 (TVING 프로모션)
  - `login`: 로그인 화면 (소셜 로그인)
  - `main`: 메인 대시보드
  - `header`: 전역 헤더 (persistent)
  - `player`: 미디어 플레이어 (persistent)

### TypeScript MFA Host 시스템

#### MicroFrontendHost 클래스
```typescript
// 싱글톤 패턴으로 안정적인 인스턴스 관리
import { getMfaHost } from '@/lib/mfa-host'

const host = getMfaHost()
await host.initialize()          // Import Map 초기화
await host.loadApp(appId)        // 앱 동적 로드
await host.mountApp(appId, containerId)  // 앱 마운트
host.unmountApp(appId)           // 앱 언마운트
```

#### Import Map 동적 주입
- 더 이상 외부 JS 파일에 의존하지 않음
- TypeScript 클래스가 직접 Import Map 생성 및 주입
- 타입 안정성 보장

### 스타일링 시스템

#### Tailwind CSS 통합
- **모든 앱에서 Tailwind CSS 사용**
- **공통 설정**: `tailwind.config.base.js`
- **TVING 색상 테마**:
  ```js
  tving: {
    red: '#FF153C',
    dark: '#000000',
    gray: { 100-800 }
  }
  ```
- **PostCSS**: `@tailwindcss/postcss` 플러그인 사용
- **No JavaScript Events**: `onMouseEnter` 제거, `hover:` 클래스 사용

### 철학: 일관성과 효율성

#### 네이밍 일관성 (The Golden Rule)
```
폴더명 = package.json name = workspace name = API 설정 = 개발자 멘탈
```

#### Import Map의 가치
100개의 Remote 앱이 있을 때:
- **전통 방식**: 각 앱이 React 번들링 → 15MB (150KB × 100)
- **Import Map 방식**: Framework 한 번만 로드 → 1.3MB (300KB + 10KB × 100)
- **절감 효과**: 91% 용량 감소

## Development Workflow

### 개발 서버 시작
```bash
# CLI로 개발할 앱 선택
pnpm dev

# 자동으로 포트 기억 (.mfa-dev-config.json)
{
  "lastSelected": ["onboarding"],
  "apps": {
    "onboarding": { "port": 4001 }
  }
}
```

### 빌드 및 타입 체크
```bash
pnpm build        # 전체 빌드
pnpm typecheck    # TypeScript 타입 체크
```

## File Structure (현행화)

```
mfa-test/
├── host/                       # Next.js Host Application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── page.tsx       # 메인 네비게이션 (Tailwind)
│   │   │   ├── onboarding/    
│   │   │   ├── login/         
│   │   │   └── main/          
│   │   ├── components/
│   │   │   └── MfaRemoteLoader.tsx  # TypeScript 기반 로더
│   │   └── lib/
│   │       ├── mfa-host.ts         # MFA Host 시스템 ✨
│   │       ├── mfa-api-mock.ts     # Mock API
│   │       └── mfa-dev-config.ts   # 개발 설정
│   ├── tailwind.config.js    # root config 상속
│   └── postcss.config.js     # @tailwindcss/postcss
├── framework/                 # @mfa/framework
│   └── src/main.jsx          
├── apps/                      # Remote Applications (모두 Tailwind)
│   ├── onboarding/           
│   ├── login/                
│   ├── main/                 
│   ├── header/               
│   └── player/               
├── scripts/
│   └── dev-cli.js            
├── .mfa-dev-config.json      # 자동 생성
├── tailwind.config.base.js   # 공통 Tailwind 설정 ✨
└── postcss.config.js         # Root PostCSS 설정 ✨
```

## Important Rules

### No Window Global (전역 객체 사용 금지)
- ❌ `window.MicroFrontendHost`
- ✅ `import { getMfaHost } from '@/lib/mfa-host'`
- TypeScript 모듈과 클래스로 깔끔한 구조 유지

### No Hardcoding (하드코딩 금지)
- URL, 포트, 경로 등 하드코딩 금지
- 모든 설정은 중앙 관리
- 환경별 동적 설정 활용

### Tailwind Only (스타일링 일관성)
- 모든 스타일은 Tailwind CSS 클래스로
- `onMouseEnter/onMouseLeave` 사용 금지
- `hover:`, `focus:` 등 CSS 기반 상태 관리

## Troubleshooting

### "MicroFrontendHost not found" 오류 (해결됨)
- ✅ TypeScript 모듈로 완전 재구성
- ✅ `getMfaHost()` 싱글톤 패턴 사용
- ✅ 타입 안정성 보장

### Import Map 로딩 실패
1. 개발 서버 확인: `pnpm dev`
2. 포트 설정 확인: `.mfa-dev-config.json`
3. Host 초기화 확인: `await host.initialize()`

### Tailwind CSS 적용 안 됨
1. `postcss.config.js`: `@tailwindcss/postcss` 설정
2. `src/index.css`: `@tailwind` directives
3. `main.tsx`: CSS import 확인

## Recent Changes (2025-08-12)

### ✅ 완료된 작업
1. **TypeScript 기반 MFA Host 시스템 구축**
   - window 전역 객체 의존성 제거
   - 싱글톤 패턴으로 안정적인 인스턴스 관리
   - 타입 안정성 확보

2. **Tailwind CSS 전면 적용**
   - 모든 앱 Tailwind로 마이그레이션
   - 공통 설정 파일로 일관성 확보
   - hover 이벤트를 CSS로 전환

3. **불필요한 파일 정리**
   - 외부 JS 파일들 제거
   - 사용하지 않는 컴포넌트 정리
   - 코드베이스 간소화

### 🚧 향후 계획
- Production 빌드 최적화
- CDN 배포 전략
- Remote 앱 간 통신 시스템
- 성능 모니터링 도구

## Developer Notes

"TypeScript로 깔끔하게 정리하니 훨씬 안정적이고 유지보수하기 좋아졌다. 
window 전역 객체에 의존하지 않고, 타입이 명확하니 개발 경험이 크게 개선됐다."

"Tailwind CSS로 통일하니 스타일 관리가 훨씬 편해졌다. 
각 앱마다 다른 스타일 시스템을 쓰면 나중에 고생한다. 처음부터 통일하자."

"Import Map의 진짜 힘은 공통 라이브러리를 한 번만 로드하는 것. 
이걸 제대로 활용하면 대규모 MFA 시스템도 가볍게 만들 수 있다."