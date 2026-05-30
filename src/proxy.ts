import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const config = { matcher: ['/profile', '/protected/:path*', '/signin', '/register'] }

export function proxy(request: NextRequest) {

    let sessionToken = request.cookies.get('__Secure-next-auth.session-token') ||
        request.cookies.get('next-auth.session-token')


    const { pathname } = request.nextUrl


    if (sessionToken) {
        if (pathname === '/signin' || pathname === '/register') {

            return NextResponse.redirect(new URL('/profile', request.url))
        }

        return NextResponse.next()
    }
    if (!sessionToken) {
        if (pathname === '/profile') {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

    }


    return NextResponse.next()
}