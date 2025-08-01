"use client";

import { MFA_APPS, PERSISTENT_APPS, ROUTE_APPS } from "@/config/mfa-apps";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MFADynamicLoader from "./MFADynamicLoader";

export default function MFAContainer() {
  const pathname = usePathname();
  const [moduleUrls, setModuleUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 현재 경로에서 로드할 앱들
  const currentApps = useMemo(() => ROUTE_APPS[pathname] || [], [pathname]);

  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === "undefined") return;

    // API에서 URL 정보 가져오기
    fetch("/api/mfa-config")
      .then((res) => res.json())
      .then((data) => {
        setModuleUrls(data.apps);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch MFA config:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading MFA configuration...</div>;
  }

  return (
    <>
      {/* 영구 앱들 (헤더 등) */}
      {PERSISTENT_APPS.map((appId: string) =>
        moduleUrls[appId] ? (
          <MFADynamicLoader
            key={appId}
            appId={appId}
            moduleUrl={moduleUrls[appId]}
            containerId={`${MFA_APPS[appId].name}-container`}
          />
        ) : null
      )}

      {/* 페이지별 앱들 */}
      <div id="page-apps" className="container mx-auto px-4 py-8">
        {currentApps.map((appId: string) =>
          moduleUrls[appId] ? (
            <MFADynamicLoader
              key={appId}
              appId={appId}
              moduleUrl={moduleUrls[appId]}
            />
          ) : null
        )}
      </div>
    </>
  );
}
