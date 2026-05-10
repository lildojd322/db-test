'use client'
import { useEffect, useState } from "react"
import styles from './LatestUserPosts.module.scss'
import Link from "next/link"

const LatestUserPosts = ({ email, name }) => {
    const [latestPosts, setLatestPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!email) return

        fetch(`/api/latestUserPosts?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLatestPosts(data.data || [])
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [email])

    return (
        <div>
            {latestPosts.length > 0 ? (
                <>
                    <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>
                        {name}'s latest posts
                    </h1>
                    <ul>
                        {latestPosts.map(post => (
                            <li key={post.id} className={styles.postItem}>
                                <div className={styles.title}>
                                    <Link href={`/blog/${post.id}`} className={styles.postLink}>
                                        {post.title}
                                    </Link>
                                </div>
                                <div className={styles.postMeta}>
                                    <span className={styles.date}>
                                        {new Date(post.created_at).toLocaleDateString('en-EN')}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h1 style={{ marginTop: '20px' }}>
                    {name} haven't posted anything yet
                </h1>
            )}
        </div>
    )
}

export default LatestUserPosts