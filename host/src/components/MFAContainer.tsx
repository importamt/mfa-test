"use client";

import { React, useEffect, useRef } from '@mfa/framework';
import { initializeMFASystem, HybridMFASystem } from "@/lib/mfa-system";

export default function MFAContainer() {
  const mfaSystemRef = useRef<HybridMFASystem | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // 서버에서 이미 설정된 MFA_CONFIG 사용
    if (typeof window === "undefined" || !window.MFA_CONFIG) return;

    // 한 번만 초기화
    if (!isInitialized.current) {
      console.log("🚀 MFA Container 초기화", {
        importMap: (window.MFA_CONFIG as any).importMap,
        persistentApps: window.MFA_CONFIG.persistentApps,
        routingTable: window.MFA_CONFIG.routingTable
      });
      
      mfaSystemRef.current = initializeMFASystem();
      isInitialized.current = true;
    }
  }, []);

  // mfa-system이 모든 것을 동적으로 처리
  return <div id="mfa-root" />;
}
