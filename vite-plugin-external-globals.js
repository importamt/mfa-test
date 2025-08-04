// Vite 플러그인 - import를 전역 변수로 변환
export function externalGlobals(globals) {
  return {
    name: 'external-globals',
    
    transform(code, id) {
      // .js, .jsx, .ts, .tsx 파일만 처리
      if (!/\.[jt]sx?$/.test(id)) return null;
      
      let hasChanges = false;
      let transformedCode = code;
      
      Object.entries(globals).forEach(([module, global]) => {
        // 정규식을 이스케이프
        const escapedModule = module.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // import 구문 변환
        const importRegex = new RegExp(
          `import\\s+(?:(.+?)\\s+from\\s+)?['"]${escapedModule}['"];?`,
          'g'
        );
        
        transformedCode = transformedCode.replace(importRegex, (match, imports) => {
          hasChanges = true;
          
          if (!imports) return ''; // side-effect import
          
          if (imports.includes('{')) {
            // Named imports: import { useState, useEffect } from 'react'
            const namedImports = imports.match(/{([^}]+)}/)?.[1];
            if (namedImports) {
              return namedImports
                .split(',')
                .map(name => {
                  const trimmed = name.trim();
                  const [localName, importedName] = trimmed.includes(' as ') 
                    ? trimmed.split(' as ').map(s => s.trim())
                    : [trimmed, trimmed];
                  return `const ${localName} = ${global}.${importedName};`;
                })
                .join('\n');
            }
          }
          
          // Default import: import React from 'react'
          const defaultImport = imports.replace(/{[^}]+}/g, '').trim();
          if (defaultImport) {
            return `const ${defaultImport} = ${global};`;
          }
          
          return '';
        });
      });
      
      return hasChanges ? { code: transformedCode, map: null } : null;
    }
  };
}