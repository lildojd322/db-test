import { getCommentsFromDBByPostId, getCountCommentsFromDBByPostId } from '../../../../lib/db'
import { NextResponse } from 'next/server'
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const idString = searchParams.get('id')
        const id = parseInt(idString, 10)
        if (!id) {
            return NextResponse.json({ error: "id required" }, { status: 400 })
        }


        const comments = await getCommentsFromDBByPostId(id)
        const countComments = await getCountCommentsFromDBByPostId(id)


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

