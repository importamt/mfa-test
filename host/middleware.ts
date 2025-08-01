import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 현재 경로를 헤더에 추가하여 서버 컴포넌트에서 사용할 수 있도록 함
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  requestHeaders.set('x-search-params', request.nextUrl.searchParams.toString())

  // API 요청이 아닌 페이지 요청에 대해서만 적용
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    console.log(`🔄 MFA 라우팅: ${request.nextUrl.pathname}`)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}