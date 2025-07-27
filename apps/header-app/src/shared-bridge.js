// Shared 모듈 브리지 - 환경에 따라 다른 방식으로 shared 접근
import React from 'react';

let sharedModuleCache = null;
let sharedModulePromise = null;

// Shared 모듈을 로드하는 함수
async function loadSharedModule() {
    if (sharedModuleCache) {
        return sharedModuleCache;
    }
    
    if (sharedModulePromise) {
        return sharedModulePromise;
    }
    
    sharedModulePromise = (async () => {
        const isDev = import.meta.env.DEV;
        let sharedModule = null;

        if (isDev) {
            // 개발 모드: Vite alias를 통한 직접 import
            try {
                sharedModule = await import('@mfa/shared');
            } catch (error) {
                console.error('Failed to import shared in dev mode:', error);
            }
        } else {
            // 프로덕션 모드: 전역 변수에서 가져오기
            const maxRetries = 50; // 5초 대기
            let retries = 0;
            
            while (!window.__MFA_SHARED__ && retries < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retries++;
            }
            
            if (window.__MFA_SHARED__) {
                sharedModule = window.__MFA_SHARED__;
            } else {
                console.error('Shared module not found in global scope');
                // 폴백: 직접 import 시도
                try {
                    sharedModule = await import('@mfa/shared');
                } catch (error) {
                    console.error('Failed to import shared as fallback:', error);
                }
            }
        }

        if (!sharedModule) {
            throw new Error('Shared module could not be loaded');
        }
        
        sharedModuleCache = sharedModule;
        return sharedModule;
    })();
    
    return sharedModulePromise;
}

// Hook을 wrapping하는 함수들
export function useGlobalUser() {
    const [shared, setShared] = React.useState(null);
    
    React.useEffect(() => {
        loadSharedModule().then(module => {
            setShared(module);
        }).catch(error => {
            console.error('Failed to load shared module:', error);
        });
    }, []);
    
    if (!shared || !shared.useGlobalUser) {
        return { user: null, theme: 'light', setTheme: () => {}, setLanguage: () => {} };
    }
    
    return shared.useGlobalUser();
}

export function useGlobalNotification() {
    const [shared, setShared] = React.useState(null);
    
    React.useEffect(() => {
        loadSharedModule().then(module => {
            setShared(module);
        }).catch(error => {
            console.error('Failed to load shared module:', error);
        });
    }, []);
    
    if (!shared || !shared.useGlobalNotification) {
        return { 
            addNotification: () => {}, 
            removeNotification: () => {}, 
            clearNotifications: () => {},
            notifications: []
        };
    }
    
    return shared.useGlobalNotification();
}

export function useSettings() {
    const [shared, setShared] = React.useState(null);
    
    React.useEffect(() => {
        loadSharedModule().then(module => {
            setShared(module);
        }).catch(error => {
            console.error('Failed to load shared module:', error);
        });
    }, []);
    
    if (!shared || !shared.useSettings) {
        return { data: null, isLoading: true, error: null };
    }
    
    return shared.useSettings();
}

// 유틸리티 함수들
export async function formatDate(date, format) {
    const shared = await loadSharedModule();
    return shared.formatDate ? shared.formatDate(date, format) : new Date(date).toLocaleDateString();
}

// 상수들 - 기본값 제공
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
};

export const LANGUAGES = {
    KO: 'ko',
    EN: 'en',
    JA: 'ja'
};

export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

