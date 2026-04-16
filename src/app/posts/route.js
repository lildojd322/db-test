import { NextResponse } from 'next/server'
import { fetchPostsFromDB, getPostsFromDBByKeyword } from '../../../lib/db'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit')) || 20
    const offset = parseInt(searchParams.get('offset')) || 0
    const keyword = searchParams.get('keyword') || ''

    try {
        const posts = keyword 
            ? await getPostsFromDBByKeyword(keyword, limit, offset)
            : await fetchPostsFromDB(limit, offset)
        
        return NextResponse.json(posts)
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch posts' }, 
            { status: 500 }
        )
    }
}