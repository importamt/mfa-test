#!/bin/bash
# 빌드된 파일들을 host/public으로 복사

# 스크립트 위치에서 프로젝트 루트로 이동
cd "$(dirname "$0")/.."

echo "📦 Copying build files to host/public..."

# 디렉토리 생성
mkdir -p host/public/shared
mkdir -p host/public/apps

# Framework
cp shared/dist/shared-v1.js host/public/shared/

# Apps
cp apps/micro-app-1/dist/micro-app-1-v1.js host/public/apps/
cp apps/micro-app-2/dist/micro-app-2-v1.js host/public/apps/
cp apps/header-app/dist/header-app-v1.js host/public/apps/header-v1.js
cp apps/pip-app/dist/pip-v1.js host/public/apps/

echo "✅ All files copied successfully!"
echo ""
echo "📊 Build sizes:"
ls -lh host/public/shared/shared-v1.js
ls -lh host/public/apps/*.js