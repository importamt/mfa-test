# 🚀 간단 배포 가이드

## 🎯 목표
각 마이크로 앱을 S3 + CloudFront로 배포하여 온라인에서 확인

## 📋 사전 준비

1. **AWS 설정**
   - S3 버킷 생성: `mfa-{앱이름}-prod`
   - CloudFront 배포 설정
   - 적절한 CORS 및 캐싱 정책 설정

2. **GitHub Secrets 설정**
   ```
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   # 또는 향후
   SHAREDSERVICE_ROLE_TO_ASSUME=your_role_arn
   ```

## 🚀 배포 방법

### 1. Tag 생성으로 자동 배포

```bash
# 현재 태그 확인
node scripts/release.js list

# 특정 앱 배포 (patch 버전업)
node scripts/release.js release shared
node scripts/release.js release header-app  
node scripts/release.js release pip-app
node scripts/release.js release micro-app-1
node scripts/release.js release micro-app-2

# 버전 타입 지정
node scripts/release.js release shared minor   # 1.0.0 → 1.1.0
node scripts/release.js release shared major   # 1.0.0 → 2.0.0

# 커스텀 버전
node scripts/release.js release shared patch 1.2.3
```

### 2. 배포 프로세스

1. **Tag 생성** → GitHub Actions 트리거
2. **의존성 캐싱** → 빠른 빌드
3. **앱 빌드** → Vite로 번들링
4. **S3 업로드** → 정적 파일 호스팅
5. **CloudFront 무효화** → 즉시 반영

## 📊 배포 확인

### GitHub Actions에서 확인
- Actions 탭에서 배포 상태 확인
- 배포 완료 후 Summary에서 접속 URL 확인

### 접속 URL 형식
```
S3: https://mfa-{앱이름}-prod.s3.us-east-1.amazonaws.com
CloudFront: https://your-cloudfront-domain.net
```

## 🔧 캐싱 최적화

### 적용된 캐싱 전략
- **Git checkout**: 전체 히스토리 캐싱
- **pnpm**: node_modules 캐싱  
- **빌드 결과**: 앱별 dist 폴더 캐싱
- **CloudFront**: JS 파일 1년 캐싱

### 캐시 무효화
- Tag 생성 시 자동으로 CloudFront 무효화
- 즉시 새 버전 반영

## 📝 예시 워크플로우

```bash
# 1. 코드 수정
vim apps/header-app/src/main.jsx

# 2. 커밋
git add .
git commit -m "feat: update header design"

# 3. 배포
node scripts/release.js release header-app

# 4. GitHub Actions에서 자동 배포
# 5. S3 + CloudFront에서 확인
```

## 🎯 결과

각 마이크로 앱이 독립적으로:
- ✅ S3에 업로드
- ✅ CloudFront로 글로벌 배포
- ✅ 버전 관리 (Git tag)
- ✅ 자동 캐시 무효화
- ✅ 빌드/배포 최적화

이제 로컬 호스트에서 배포된 URL을 import map에 설정하면 온라인 마이크로 앱들을 불러올 수 있습니다!