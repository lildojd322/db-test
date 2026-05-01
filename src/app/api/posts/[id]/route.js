import { deletePostById } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {

    const { id } = await params
    const postId = Number(id)
    let result
    try {
        if (id && !isNaN(id) && id > 0) {

            result = await deletePostById(id)

            if (!result || result.affectedRows === 0) {
                return NextResponse.json({ error: "post not found" }, { status: 404 })
            }

            return NextResponse.json({
                success: true,
                message: "Пост удалён",
                affectedRows: result.affectedRows
            })

        } else {
            return NextResponse.json({ error: "incorrect ID" }, { status: 400 })
        }



    } catch (error) {
        return NextResponse.json({ error: "db error" }, { status: 500 })
    }
}   