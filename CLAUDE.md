# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT: Always respond in Korean (한글) when working in this repository.** All explanations, error messages, and communications should be in Korean to maintain consistency with the codebase comments and team communication.

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