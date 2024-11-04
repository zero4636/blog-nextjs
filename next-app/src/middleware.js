import { NextResponse } from 'next/server'
import {validateToken} from '@/services/admin'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let cookie = request.cookies.get('user')
  if (cookie) {
    const data = await validateToken(JSON.parse(cookie.value))  || [];
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
  matcher: [
    '/admin',
  ],
}