'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'


const PostsList = (props) => {
    const { initialPosts, keyword } = props
    const [posts, setPosts] = useState(initialPosts)
    const [offset, setOffset] = useState(20)
    const [hasMore, setHasMore] = useState(posts.length > 20)
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        setPosts(initialPosts)
        setOffset(20)
        setHasMore(initialPosts.length >= 20)

    }, [keyword, initialPosts])

    const loadMore = async () => {
        const res = await fetch(`/api/posts?offset=${offset}&limit=20`);
        const newPosts = await res.json();
        if (newPosts.length < 20) setHasMore(false)
        setPosts([...posts, ...newPosts])
        setOffset(prev => prev + 20)
        setLoading(false)
    }

    return (
        <>   <ul className="posts-list">
            {posts.length > 0 ? posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                    <div>{post.body}</div>
                </li>
            )) : <h1>posts not found</h1>}

        </ul>
            {hasMore && (
                <button className="load-more-btn" onClick={loadMore} className="load-more-btn" disabled={loading}>
                    {loading ? 'Loading...' : 'show more'}
                </button>
            )}
        </>
    )
}
export default PostsList
