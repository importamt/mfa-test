// 공용 유틸리티 함수들

// 날짜 포맷팅
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  
  const formats = {
    'YYYY-MM-DD': `${year}-${month}-${day}`,
    'YYYY-MM-DD HH:mm': `${year}-${month}-${day} ${hours}:${minutes}`,
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'relative': getRelativeTime(d)
  }
  
  return formats[format] || formats['YYYY-MM-DD']
}

function getRelativeTime(date) {
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}일 전`
  if (hours > 0) return `${hours}시간 전`
  if (minutes > 0) return `${minutes}분 전`
  return '방금 전'
}

// 디바운스
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 스로틀
export function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 로컬 스토리지 헬퍼
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }
}

// URL 파라미터 헬퍼
export function getUrlParams(url = window.location.href) {
  const urlObject = new URL(url)
  return Object.fromEntries(urlObject.searchParams)
}

export function updateUrlParams(params, replace = false) {
  const url = new URL(window.location.href)
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, value)
    }
  })
  
  if (replace) {
    window.history.replaceState({}, '', url.toString())
  } else {
    window.history.pushState({}, '', url.toString())
  }
}

// 클래스명 결합
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// 깊은 복사
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone(obj[key])
    })
    return clonedObj
  }
}