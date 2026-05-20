import { deletePostById } from "@/lib/db"
import { NextResponse } from "next/server"
import { idParamSchema } from '../../../../lib/zod'

export async function DELETE(request, { params }) {


    try {
        const resolvedParams = await params
        const validation = idParamSchema.safeParse({
            id: resolvedParams.id
        })

        if (!validation.success) {

            console.log("backend Zod error:", validation.error.format())
            return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
        }
        const id = Number(validation.data)


        let result


        result = await deletePostById(id)

        if (!result || result.affectedRows === 0) {
            return NextResponse.json({ error: "post not found" }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "Пост удалён",
            affectedRows: result.affectedRows
        })

    



    } catch (error) {
    return NextResponse.json({ error: "db error" }, { status: 500 })
}
}   