'use server'

import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // const cookieStore = await cookies()
  // If the user is authenticated, continue as normal
  // console.log(request.nextUrl)

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
