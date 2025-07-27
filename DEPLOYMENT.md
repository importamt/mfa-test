# MFA 배포 가이드

## 📋 개요

이 프로젝트는 다음과 같은 배포 아키텍처를 사용합니다:

- **마이크로 앱들** (shared, header-app, pip-app, micro-app-1, micro-app-2): S3 + CloudFront
- **호스트 앱**: 로컬 개발 또는 별도 컴퓨팅 환경

## 🚀 배포 프로세스

### 1. AWS 인프라 설정

```bash
# 개발 환경 설정
./scripts/setup-aws.sh dev

# 프로덕션 환경 설정  
./scripts/setup-aws.sh prod us-east-1
```

### 2. GitHub Secrets 설정

GitHub 저장소 Settings > Secrets and variables > Actions에서 다음 시크릿을 추가:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

### 3. 수동 배포

```bash
# 특정 앱 배포
node scripts/deploy.js deploy shared dev
node scripts/deploy.js deploy header-app prod

# 모든 앱 배포
node scripts/deploy.js deploy-all dev
```

### 4. 자동 배포 (GitHub Actions)

- `main` 브랜치 푸시 → 프로덕션 배포
- `develop` 브랜치 푸시 → 개발 환경 배포
- 변경된 앱만 자동 감지하여 선택적 배포

## 🏗️ 아키텍처

### S3 + CloudFront 구조

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│ GitHub Actions │───▶│   S3 Buckets    │
└─────────────────┘    └──────────────┘    └─────────────────┘
                                                      │
                                                      ▼
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Local Host    │◀───│ Import Map   │◀───│  CloudFront CDN │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

### 배포 환경별 URL

#### 개발 환경 (dev)
```
shared: https://mfa-shared-dev.s3.us-east-1.amazonaws.com
header-app: https://mfa-header-app-dev.s3.us-east-1.amazonaws.com
pip-app: https://mfa-pip-app-dev.s3.us-east-1.amazonaws.com
micro-app-1: https://mfa-micro-app-1-dev.s3.us-east-1.amazonaws.com
micro-app-2: https://mfa-micro-app-2-dev.s3.us-east-1.amazonaws.com
```

#### 프로덕션 환경 (prod)
```
shared: https://shared.mfa-apps.com
header-app: https://header-app.mfa-apps.com
pip-app: https://pip-app.mfa-apps.com
micro-app-1: https://micro-app-1.mfa-apps.com
micro-app-2: https://micro-app-2.mfa-apps.com
```

## 🔧 로컬 호스트 설정

### 환경별 설정 업데이트

```bash
# 배포된 앱들의 URL을 로컬 호스트에 반영
node scripts/deploy.js config prod
```

이 명령어는 `host/src/config.js` 파일을 생성하여 배포된 마이크로 앱들의 URL을 설정합니다.

### 호스트 앱 실행

```bash
cd host
pnpm dev
```

## 📊 모니터링 및 최적화

### 캐싱 전략

- **JS 파일**: 1년 캐시 (immutable, 파일명에 해시 포함)
- **기타 리소스**: 1일 캐시
- **CloudFront**: 글로벌 CDN으로 성능 최적화

### 배포 최적화

1. **변경 감지**: `dorny/paths-filter`로 변경된 앱만 배포
2. **병렬 빌드**: 독립적인 앱들을 병렬로 빌드
3. **의존성 캐싱**: pnpm 캐시와 node_modules 캐싱
4. **CloudFront 무효화**: 배포 완료 후 자동 캐시 무효화

### 빌드 최적화

- **Tree Shaking**: 사용하지 않는 코드 제거
- **Minification**: Terser로 코드 압축
- **소스맵 제거**: 프로덕션에서 소스맵 비활성화
- **GZIP 압축**: CloudFront에서 자동 압축

## 🐛 트러블슈팅

### 일반적인 문제들

1. **CORS 에러**
   - CloudFront CORS 정책 확인
   - S3 버킷 CORS 설정 확인

2. **모듈 로드 실패**
   - Import Map URL 확인
   - 네트워크 탭에서 404 에러 확인

3. **캐시 문제**
   - CloudFront 무효화 실행
   - 브라우저 캐시 클리어

### AWS 리소스 정리

```bash
cd infrastructure/aws
terraform destroy \
  -var="environment=dev" \
  -var="aws_region=us-east-1"
```

## 📝 체크리스트

배포 전 확인사항:

- [ ] AWS 인증 정보 설정 완료
- [ ] GitHub Secrets 추가 완료
- [ ] Terraform 인프라 생성 완료
- [ ] 도메인 설정 완료 (프로덕션)
- [ ] SSL 인증서 검증 완료 (프로덕션)

배포 후 확인사항:

- [ ] 모든 마이크로 앱 로드 확인
- [ ] 상태 공유 기능 테스트
- [ ] 알림 시스템 테스트
- [ ] 네트워크 성능 확인
- [ ] 모바일 반응형 확인

## 🔮 향후 개선사항

1. **모니터링**: CloudWatch + X-Ray 추가
2. **보안**: WAF + 보안 헤더 강화
3. **성능**: 코드 스플리팅 + 지연 로딩
4. **테스트**: E2E 테스트 자동화
5. **롤백**: Blue-Green 배포 전략