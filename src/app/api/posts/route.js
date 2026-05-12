import { fetchPostsFromDB, getPostsFromDBByKeyword } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit")) || 20
    const offset = parseInt(searchParams.get("offset")) || 0
    const keyword = searchParams.get("keyword") || ""

    let posts = []
    try {
        if (keyword) {
            posts = await getPostsFromDBByKeyword(keyword, limit, offset)
        } else {
            posts = await fetchPostsFromDB(limit, offset)
        }
        return NextResponse.json(posts)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "db error" }, { status: 500 })
    }
}