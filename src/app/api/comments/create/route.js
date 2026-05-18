import { forwardCommentToDB } from '../../../../lib/db'
import { NextResponse } from 'next/server'


export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('post_id')
        const userId = searchParams.get('user_id')
        const commentText = searchParams.get('post_text')


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

