'use client'
import Link from 'next/link'
import { useEffect, useState } from "react"

import styles from './MainLatestPosts.module.scss'


const MainLatestPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {


        fetch('/api/latestPosts')
            .then(res => res.json())
            .then(data => {
                const fetchedPosts = data.data || []
                setPosts(fetchedPosts)
                setLoading(false)
            })
            .catch(err => {
                console.error("error:", err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading posts...</div>
    }

    if (posts.length === 0) {
        return <div>No posts found</div>
    }


    return (
        <ul className={styles.postsGrid}>
            {posts.map((post) => {
                return (
                    <li key={post.id} className={styles.postCard}>
                        <Link href={`/blog/${post.id}`}>
                            <span className={styles.postTitle}>{post.title}</span>
                            <div className={styles.postMeta}>
                                <span className={styles.author}>{post.author_name}</span>
                                <span className={styles.date}>
                                    {new Date(post.created_at).toLocaleDateString('en-EN')}
                                </span>
                            </div>

                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default MainLatestPosts