import { NextResponse } from 'next/server'
import { validateToken } from '@/services/admin'

export async function middleware(request) {
  const url = new URL(request.url)

  if (url.pathname === '/admin/login' || url.pathname === '/admin/signup') {
    return NextResponse.next()
  }

  let cookie = request.cookies.get('user')
  if (cookie) {
    const data = await validateToken(JSON.parse(cookie.value)) || [];
    if (data.status == 200) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};