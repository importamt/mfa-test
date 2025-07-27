import { useQuery as useTanstackQuery, useMutation as useTanstackMutation } from '@tanstack/react-query'

// 공용 API 호출 함수들
export const api = {
  // 사용자 정보 조회
  getUser: async (userId) => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  },

  // 사용자 목록 조회
  getUsers: async (params = {}) => {
    const searchParams = new URLSearchParams(params)
    const response = await fetch(`/api/users?${searchParams}`)
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
  },

  // 사용자 업데이트
  updateUser: async ({ userId, data }) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update user')
    return response.json()
  },

  // 공용 설정 조회
  getSettings: async () => {
    const response = await fetch('/api/settings')
    if (!response.ok) throw new Error('Failed to fetch settings')
    return response.json()
  }
}

// 공용 쿼리 훅들
export function useUser(userId) {
  return useTanstackQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
    enabled: !!userId
  })
}

export function useUsers(params) {
  return useTanstackQuery({
    queryKey: ['users', params],
    queryFn: () => api.getUsers(params)
  })
}

export function useSettings() {
  return useTanstackQuery({
    queryKey: ['settings'],
    queryFn: api.getSettings,
    staleTime: 10 * 60 * 1000 // 10분
  })
}

// 공용 뮤테이션 훅들
export function useUpdateUser() {
  return useTanstackMutation({
    mutationFn: api.updateUser,
    onSuccess: () => {
      // 사용자 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}