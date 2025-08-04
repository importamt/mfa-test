/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 빌드 시 TypeScript 에러를 무시하지 않고 표시
    ignoreBuildErrors: false,
  },
  eslint: {
    // 빌드 시 ESLint 에러를 경고로 처리
    ignoreDuringBuilds: false,
  },
  // 엄격 모드 활성화
  reactStrictMode: true,
  // 실험적 기능들
  experimental: {
    // Turbopack 비활성화
  },
  // 정적 파일 서빙 최적화
  compress: true,
  // 이미지 최적화
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig