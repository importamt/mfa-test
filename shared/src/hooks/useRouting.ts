import { useRoutingStore } from '../stores/globalStore.js'

export const useRouting = () => {
  const { navigate, currentPath } = useRoutingStore()
  
  return {
    navigate,
    currentPath,
    isActive: (path: string) => currentPath === path
  }
}