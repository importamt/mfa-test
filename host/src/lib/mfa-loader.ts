/**
 * Import Map을 사용하는 브라우저 네이티브 모듈 로더
 */

// 브라우저의 네이티브 import를 사용하기 위한 헬퍼
export async function loadModule(moduleId: string): Promise<any> {
  // eval을 사용해서 빌드 시스템이 변환하지 못하게 함
  // 이렇게 하면 브라우저가 Import Map을 사용해서 모듈을 로드
  try {
    // Create a dynamic import that won't be transformed by bundlers
    const importModule = new Function('moduleId', `
      return import(moduleId);
    `);
    
    const module = await importModule(moduleId);
    return module;
  } catch (error) {
    console.error(`Failed to load module ${moduleId}:`, error);
    throw error;
  }
}

// Alternative approach using script tag injection
export async function loadModuleViaScript(moduleId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import * as module from '${moduleId}';
      window.__mfa_modules = window.__mfa_modules || {};
      window.__mfa_modules['${moduleId}'] = module;
      window.dispatchEvent(new CustomEvent('mfa-module-loaded', { detail: '${moduleId}' }));
    `;
    
    const handleLoad = (event: any) => {
      if (event.detail === moduleId) {
        window.removeEventListener('mfa-module-loaded', handleLoad);
        const module = (window as any).__mfa_modules?.[moduleId];
        if (module) {
          resolve(module);
        } else {
          reject(new Error(`Module ${moduleId} not found after load`));
        }
      }
    };
    
    window.addEventListener('mfa-module-loaded', handleLoad);
    
    script.onerror = () => {
      window.removeEventListener('mfa-module-loaded', handleLoad);
      reject(new Error(`Failed to load module ${moduleId}`));
    };
    
    document.head.appendChild(script);
  });
}