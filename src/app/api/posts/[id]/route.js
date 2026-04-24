import { deletePostById } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(request) {

    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get("id") || "")
    let result
    try {
        if (id && !isNaN(id) && id > 0) {

            result = await deletePostById(id)

            if (!result || result.affectedRows === 0) {
                return NextResponse.json({ error: "Пост не найден" }, { status: 404 })
            }

            return NextResponse.json({
                success: true,
                message: "Пост удалён",
                affectedRows: result.affectedRows
            })

        } else {
            return NextResponse.json({ error: "Неверный ID" }, { status: 400 })
        }

     

    } catch (error) {
        return NextResponse.json({ error: "Ошибка БД" }, { status: 500 })
    }
}   