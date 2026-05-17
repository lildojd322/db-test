'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './PostsList.module.scss'
import { usePostStore } from '../../store/store'



const PostsList = (props) => {
    const { initialPosts, keyword, userId } = props
    const {
        storedPosts, setPosts,
        storedOffset, setOffset,
        storedHasMore, setHasMore,
        storedKeyword, setKeyword,
        reset
    } = usePostStore()


    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (keyword !== storedKeyword) {
            reset()
            setKeyword(keyword)
            setPosts(initialPosts)
            setOffset(initialPosts.length)
            setHasMore(initialPosts.length >= 20)
        }
    }, [initialPosts, keyword])


    const currentPosts = storedPosts.length > 0 ? storedPosts : initialPosts
    const currentOffset = storedPosts.length > 0 ? storedOffset : initialPosts.length
    const currentHasMore = storedPosts.length > 0 ? storedHasMore : (initialPosts.length >= 20)




    const loadMore = async () => {
        const res = await fetch(
            userId
                ? `/api/posts?offset=${currentOffset}&limit=20&userId=${userId}`
                : keyword
                    ? `/api/posts?offset=${currentOffset}&limit=20&keyword=${encodeURIComponent(keyword)}`
                    : `/api/posts?offset=${currentOffset}&limit=20`
        )
        const newPosts = await res.json()
        if (newPosts.length < 20) setHasMore(false)
        setPosts([...currentPosts, ...newPosts])
        setOffset(currentOffset + 20)

        setLoading(false)
    }

    return (
        <>
            <ul className={styles.postsList}>
                {currentPosts.length > 0 ? currentPosts.map((post) => (
                    <li key={post.id} className={styles.postItem}> <div className={styles.title}>
                        <Link scroll={false} href={`/blog/${post.id}`} className={styles.postLink}>
                            {post.title}
                        </Link></div>
                        <div className={styles.postMeta}>
                            <span className={styles.author}>{post.author_name}</span>
                            <span className={styles.date}>
                                {new Date(post.created_at).toLocaleDateString('en-EN')}
                            </span>
                        </div>

                    </li>
                )) : <h1>posts not found</h1>}
            </ul>
            {currentHasMore && (
                <button className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'show more'}
                </button>
            )
            }
        </>
    )
}
export default PostsList
