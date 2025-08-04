#!/bin/bash
# 배포 스크립트

# 1. 빌드
echo "🔨 Building all apps..."
pnpm build

# 2. 파일 복사
echo "📦 Copying build files..."
mkdir -p dist/production

# Framework
cp shared/dist/shared-v1.js dist/production/shared/
cp host/public/react-bridge.js dist/production/utils/

# 마이크로앱들
for app in apps/*; do
  if [ -d "$app/dist" ]; then
    app_name=$(basename $app)
    mkdir -p dist/production/apps/$app_name/v1.0.0/
    cp $app/dist/*.js dist/production/apps/$app_name/v1.0.0/
  fi
done

# 3. CDN 업로드 (AWS S3 예시)
echo "☁️  Uploading to CDN..."
aws s3 sync dist/production/ s3://mfa-cdn-bucket/ \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "api/*"

# 4. CloudFront 무효화
echo "🔄 Invalidating CDN cache..."
aws cloudfront create-invalidation \
  --distribution-id ABCDEFG \
  --paths "/api/mfa-config"

echo "✅ Deployment complete!"