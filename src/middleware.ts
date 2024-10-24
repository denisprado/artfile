'use server'

import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  // If the user is authenticated, continue as normal
  console.log(request.nextUrl)

  if (request.headers.get('pathname') === '/api/users/logout') {
    console.log('ok')
    NextResponse.redirect('/')
  }

  // Redirect to login page if not authenticated
  // return NextResponse.redirect(new URL('/login', request.url))
}

// export const config = {
//   matcher: '/dashboard/:path*',
// }
