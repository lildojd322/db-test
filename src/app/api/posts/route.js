import { fetchPostsFromDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || 20
    const offset = searchParams.get("offset") || 0

    try {
     
        const posts = await fetchPostsFromDB(limit, offset)
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: "Ошибка БД" }, { status: 500 })
    }
}