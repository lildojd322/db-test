import { fetchRandomPostFromDB } from '../../../lib/db'

import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const posts = await fetchRandomPostFromDB()

        return NextResponse.json({
            success: true,
            data: posts
        }, { status: 200 })
    } catch (error) {
        console.error("Database error:", error)
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message
        }, { status: 500 })
    }
}