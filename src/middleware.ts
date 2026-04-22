
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const response = NextResponse.next()
    const theme = request.cookies.get("theme")

    if (!theme) {
        response.cookies.set("theme", 'dark')
    }


    return response
}

    