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
- 비판적인 태도가 매우 중요함. 
- 할루시네이션을 항상 경계하고 올바른 정보를 전달하지 못할 때는 잘 모르겠다고 답변할 수 있음. 
- 개발자와 협업해서 함께 해결하려는 태도도 중요

## TypeScript Configuration

This project is fully converted to TypeScript with strict typing enabled:

- **Type Safety**: All micro apps, shared library, and host application use TypeScript
- **Shared Types**: Common interfaces and types are defined in `shared/src/types/index.ts`
- **React Components**: All React components are properly typed with JSX.Element return types
- **Import Maps**: MFA configuration and window interfaces are properly typed

## Project Architecture

This is a micro-frontend architecture (MFA) built with React and Vite, using PNPM workspaces. The system consists of:

### Core Components
- **Host Application** (`host/`): Main orchestrator that manages the micro-frontend lifecycle
- **Shared Library** (`shared/`): Common utilities, providers, and state management shared across all micro apps
- **Micro Applications** (`apps/`): Individual feature applications that can be developed independently

### Key Architecture Patterns
- **Dynamic Import Maps**: Host dynamically generates import maps to support both development (HMR) and production builds
- **Global State Management**: Uses Zustand for state management with React Query for data fetching
- **Provider Pattern**: Shared library provides global providers (MfaGlobalProvider, MfaQueryProvider) that wrap the entire application
- **Mount/Unmount Lifecycle**: Each micro app implements `mount()` and `unmount()` functions for dynamic loading

### Development vs Production Loading
- Development apps use development server URLs with HMR support
- Non-development apps use production build URLs
- Configuration in `window.MFA_CONFIG` determines which apps are in development mode

## Important Rules

### No Hardcoding (하드코딩 금지)
**절대로 URL, 포트 번호, 파일 경로 등을 하드코딩하지 마세요.**
- 모든 설정은 중앙 설정 파일(`mfa-apps.ts`, `mfa-apps.config.ts`)을 사용해야 합니다
- 개발/프로덕션 환경에 따른 동적 설정을 활용하세요
- 하드코딩된 값을 발견하면 즉시 설정 기반으로 리팩토링하세요

## Common Development Commands

### Start Development Environment
```bash
# Start all micro apps and host simultaneously
pnpm dev

# Start only micro-app-2 with host and shared
pnpm dev:micro2-only

# Start micro-app-1 and header with host and shared  
pnpm dev:micro1-header
```

### Build Commands
```bash
# Build all packages
pnpm build

# TypeScript type checking across all packages
pnpm typecheck

# Install dependencies for all workspaces
pnpm install:all
```

### Individual Package Commands
```bash
# Work with specific packages using filters
pnpm --filter mfa-host dev
pnpm --filter @mfa/shared build
pnpm --filter @mfa/micro-app-1 dev
```

## Package Structure

### Workspace Configuration
- Uses PNPM workspaces defined in `pnpm-workspace.yaml`
- Packages: `host`, `apps/*`, `shared`
- Monorepo managed with `concurrently` for parallel development

### Shared Library (`@mfa/shared`)
- Exports global providers, stores, hooks, and utilities
- Provides React Query setup and Zustand stores
- Has both development and production build configurations
- Entry point: `src/main.jsx`

### Host Application (`mfa-host`)
- Runs on port 3000 in development
- Implements `MicroFrontendHost` class for app orchestration
- Manages routing and dynamic app loading
- Entry point: `src/main.js`

### Micro Applications
- Each app in `apps/` directory has its own package.json
- Standard Vite + React setup
- Must implement `mount()` and `unmount()` functions
- Can use shared bridge for inter-app communication

## Key Files to Understand

- `host/src/main.js`: Core micro-frontend orchestration logic
- `shared/src/main.jsx`: Shared library exports and mount/unmount functions  
- `shared/src/providers/GlobalProvider.jsx`: Global state and context
- `shared/src/stores/globalStore.js`: Zustand state management
- `shared/src/hooks/useQuery.js`: React Query hooks and API layer

## 진행중인 작업 (2025-01-30)

### 동적 Import Map 서버 렌더링 구조 연구
- **관심사**: Next.js 서버 렌더링 중 imports map, routing table을 받은 뒤 index.html에 포함시켜 동적으로 remotes를 구성하는 방법
- **현재 시도 중인 접근법**:
  1. `/api/mfa-config` API로 런타임에 Import Map 생성
  2. `DynamicImportMap` 컴포넌트로 서버 렌더링 시점에 주입 시도
  3. `middleware.ts`로 요청 경로 추적
  4. `mfa-system.js`에서 동적 Import Map 활용 로직

### 현재 구조와 과제들
- **기본 아이디어**: 하이브리드 SSR + CSR로 첫 로드는 빠르게, 이후는 동적 라우팅
- **아직 정리 필요한 부분들**:
  - 실제 마이크로 앱들이 각각 개발 서버에서 돌아야 하는데 현재는 정적 파일로만 테스트
  - Import Map 구조가 중첩/평면 구조 섞여서 일관성 필요
  - 에러 핸들링과 폴백 시나리오 미비
  - 성능 최적화는 아직 이론적 단계

### 고민하고 있는 파일들
```
host/
├── src/app/api/mfa-config/route.ts    # 동적 설정 API (진행중)
├── src/components/DynamicImportMap.tsx # SSR Import Map 주입 (실험중)
├── middleware.ts                       # 경로 추적 (기본 구현)
└── public/
    ├── mfa-bootstrap.js               # 부트스트랩 로직
    ├── mfa-system.js                  # 메인 시스템 (계속 수정중)
    └── apps/                          # 임시 정적 파일들
```

### 막혔던/해결한 것들
- Next.js 15에서 `headers()`가 async로 바뀜 → `await headers()` 사용
- Import Map 찾지 못하는 오류 → 객체 구조 파싱 로직 추가
- 마이크로 앱 404 오류 → 일단 존재하는 `/apps/` 경로로 임시 해결
- 서버 렌더링 시점 데이터 주입 → 아직 완전하지 않지만 기본 틀은 동작