import { fetchLatestPostsFromDBByEmail } from '../../../lib/db'
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 })
        }
           const posts = await fetchLatestPostsFromDBByEmail(email)

        return NextResponse.json({
            message: "post fetched successfully",
            success: true,
            data: posts
        }, { status: 201 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
