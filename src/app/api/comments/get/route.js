import { getCommentsFromDBByPostId, getCountCommentsFromDBByPostId } from '../../../../lib/db'
import { NextResponse } from 'next/server'
import { idParamSchema } from '../../../../lib/zod'
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)


        const validation = idParamSchema.safeParse({
            id: searchParams.get('id')
        })


        if (!validation.success) {

            console.log("backend Zod error:", validation.error.format())
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
        }
        const { id } = validation.data

        const commentsPromise = getCommentsFromDBByPostId(id)
        const countCommentsPromise = getCountCommentsFromDBByPostId(id)

        const [comments, countComments] = await Promise.all([commentsPromise, countCommentsPromise])


        return NextResponse.json({
            message: "comments fetched successfully",
            success: true,
            data: {
                comments: comments,
                count: countComments
            }
        }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }


}

