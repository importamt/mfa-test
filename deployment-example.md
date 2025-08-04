# 실제 배포 시나리오

## CDN 구조
```
https://cdn.example.com/
├── framework/
│   └── v1.0.0/
│       └── shared-v1.js          # 206KB (gzip: 66KB)
├── apps/
│   ├── micro-app-1/
│   │   └── v1.0.0/
│   │       └── micro-app-1-v1.js # 3KB (gzip: 1.2KB)
│   ├── micro-app-2/
│   │   └── v1.0.0/
│   │       └── micro-app-2-v1.js # 3KB (gzip: 1.2KB)
│   └── header-app/
│       └── v1.0.0/
│           └── header-v1.js      # 6KB (gzip: 1.4KB)
└── utils/
    └── react-bridge.js           # 1KB
```

## 배포 시 Import Map (동적 생성)
```javascript
// mfa-config API 응답
{
  "imports": {
    "@mfa/micro-app-1": "https://cdn.example.com/apps/micro-app-1/v1.0.0/micro-app-1-v1.js",
    "@mfa/micro-app-2": "https://cdn.example.com/apps/micro-app-2/v1.0.0/micro-app-2-v1.js",
    "@mfa/header-app": "https://cdn.example.com/apps/header-app/v1.0.0/header-v1.js"
  },
  "frameworkUrl": "https://cdn.example.com/framework/v1.0.0/shared-v1.js"
}
```

## 네트워크 요청 순서
1. **HTML** (Host) - 10KB
2. **shared-v1.js** - 66KB (gzip) - React 포함
3. **react-bridge.js** - 1KB
4. **필요한 마이크로앱들** - 각 1-2KB

**총 초기 로드**: ~80KB (모든 앱 포함 시)

## 캐싱 전략
```nginx
# Framework는 장기 캐싱 (거의 변경 안됨)
location ~* /framework/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# 마이크로앱은 중간 캐싱
location ~* /apps/ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
}
```

## 버전 관리
- **Framework**: 메이저 버전 변경 시에만 업데이트
- **마이크로앱**: 독립적 버전 관리, 개별 배포 가능
- **Import Map**: 실시간 업데이트로 A/B 테스트, 점진적 롤아웃 가능