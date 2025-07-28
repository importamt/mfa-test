import { create } from 'zustand'
import type { User, Theme, Language, Notification, SSRData } from '../types/index.js'

interface UserState {
  user: User | null
  theme: Theme
  language: Language
  setUser: (user: User | null) => void
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  initializeFromSSR: (ssrData: SSRData) => void
}

// 글로벌 사용자 상태
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  theme: 'light',
  language: 'ko',
  
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  
  // SSR에서 초기화할 때 사용
  initializeFromSSR: (ssrData) => {
    const updates: Partial<UserState> = {}
    if (ssrData.user) updates.user = ssrData.user
    if (ssrData.theme) updates.theme = ssrData.theme
    if (ssrData.language) updates.language = ssrData.language
    set(updates)
  }
}))

interface EventState {
  events: Record<string, ((data?: any) => void)[]>
  emit: (eventName: string, data?: any) => void
  on: (eventName: string, handler: (data?: any) => void) => () => void
  off: (eventName: string, handler: (data?: any) => void) => void
}

// 앱 간 통신을 위한 이벤트 버스
export const useEventStore = create<EventState>((set, get) => ({
  events: {},
  
  emit: (eventName, data) => {
    const { events } = get()
    const handlers = events[eventName] || []
    handlers.forEach(handler => handler(data))
  },
  
  on: (eventName, handler) => {
    set(state => ({
      events: {
        ...state.events,
        [eventName]: [...(state.events[eventName] || []), handler]
      }
    }))
    
    // cleanup function 반환
    return () => {
      set(state => ({
        events: {
          ...state.events,
          [eventName]: (state.events[eventName] || []).filter(h => h !== handler)
        }
      }))
    }
  },
  
  off: (eventName, handler) => {
    set(state => ({
      events: {
        ...state.events,
        [eventName]: (state.events[eventName] || []).filter(h => h !== handler)
      }
    }))
  }
}))

interface NotificationState {
  notifications: (Notification & { id: number })[]  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'> & { autoRemove?: boolean, duration?: number }) => number
  removeNotification: (id: number) => void
  clearNotifications: () => void
}

// 글로벌 알림 상태
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Date.now()
    const newNotification = { id, ...notification }
    set(state => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // 자동 제거 (옵션)
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        get().removeNotification(id)
      }, notification.duration || 5000)
    }
    
    return id
  },
  
  removeNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] })
}))