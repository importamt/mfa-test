import { create } from 'zustand'

// 글로벌 사용자 상태
export const useUserStore = create((set, get) => ({
  user: null,
  theme: 'light',
  language: 'ko',
  
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  
  // SSR에서 초기화할 때 사용
  initializeFromSSR: (ssrData) => set({
    user: ssrData.user,
    theme: ssrData.theme || 'light',
    language: ssrData.language || 'ko'
  })
}))

// 앱 간 통신을 위한 이벤트 버스
export const useEventStore = create((set, get) => ({
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

// 글로벌 알림 상태
export const useNotificationStore = create((set, get) => ({
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