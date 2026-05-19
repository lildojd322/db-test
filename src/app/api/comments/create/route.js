import { forwardCommentToDB } from '../../../../lib/db'
import { NextResponse } from 'next/server'
import { commentSchema } from '../../../../lib/zod'

export async function POST(request) {
    try {
        const body = await request.json()


        const validation = commentSchema.safeParse(body)
        if (!validation.success) {

            console.log("backend Zod error:", validation.error.format())
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
        }
        const { post_id: postId, user_id: userId, comment_text: commentText } = validation.data



        if (!postId || !userId || !commentText) {
            return NextResponse.json({ error: "data retrieval error" }, { status: 400 })
        }

        await forwardCommentToDB(commentText, postId, userId)


        return NextResponse.json({
            message: "comments fetched successfully",
            success: true,

        }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }


}

