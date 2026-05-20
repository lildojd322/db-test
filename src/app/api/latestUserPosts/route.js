import { fetchLatestPostsFromDBById, fetchCountPostFromDBByUserId } from '../../../lib/db'
import { NextResponse } from "next/server"
import { idParamSchema } from '../../../lib/zod'

export const GET = async (request) => {
    try {


        const { searchParams } = new URL(request.url)

        const validation = idParamSchema.safeParse({
            id: searchParams.get('id')
        })

        if (!validation.success) {

            console.log("backend Zod error:", validation.error.format())
            return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
        }
        const userId = validation.data.id

        const posts = await fetchLatestPostsFromDBById(userId)
        const countPosts = await fetchCountPostFromDBByUserId(userId)
        const data = [posts, countPosts]

        return NextResponse.json({
            message: "post fetched successfully",
            success: true,
            data: {
                posts: posts,
                count: countPosts
            }
        }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
