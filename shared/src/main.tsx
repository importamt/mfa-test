// 타입들을 re-export
export * from './types/index.js'

// Shared 패키지의 메인 진입점
export { MfaGlobalProvider, useGlobalUser, useGlobalNotification } from './providers/GlobalProvider.js'
export { MfaQueryProvider, getQueryClient, initializeQueryClient } from './providers/QueryProvider.js'
export { RoutingProvider } from './providers/RoutingProvider.js'
export { useUserStore, useEventStore, useNotificationStore, useRoutingStore } from './stores/globalStore.js'
export { useUser, useUsers, useSettings, useUpdateUser, api } from './hooks/useQuery.js'
export { useRouting } from './hooks/useRouting.js'
export * from './utils/common.js'
export * from './utils/create-mfa-app.js'

// 글로벌 상수들 re-export
export { THEMES, LANGUAGES, NOTIFICATION_TYPES } from './types/index.js'

// 버전 정보
export const SHARED_VERSION = '1.0.0'