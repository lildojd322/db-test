import { forwardCommentToDB } from '../../../../lib/db'
import { NextResponse } from 'next/server'
import { commentSchema } from '../../../../lib/zod'

import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth/next"


export async function POST(request) {
    try {
        const body = await request.json()


        const validation = commentSchema.safeParse(body)

        if (!validation.success) {

            console.log("backend Zod error:", validation.error.format())
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
        }

        const { post_id: postId, comment_text: commentText } = validation.data


        const session = await getServerSession(authConfig)

        if (!session) {
            return NextResponse.json({ error: "The user is not authorized" }, { status: 401 })
        }

        const userId = session.user.id





        await forwardCommentToDB(commentText, postId, userId)


        return NextResponse.json({
            message: "Comment created successfully",
            success: true,

        }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }


}

