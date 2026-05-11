import { fetchLatestPostsFromDBById } from '../../../lib/db'
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('id')

        if (!userId) {
            return NextResponse.json({ error: "id required" }, { status: 400 })
        }
        const posts = await fetchLatestPostsFromDBById(userId)

        return NextResponse.json({
            message: "post fetched successfully",
            success: true,
            data: posts
        }, { status: 201 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
