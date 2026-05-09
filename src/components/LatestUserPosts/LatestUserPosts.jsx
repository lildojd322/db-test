'use client'

import { useEffect, useState } from "react"

import styles from './LatestUserPosts.module.scss'
import Link from "next/link"

const LatestUserPosts = ({ email }) => {
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

            <ul>
                {latestPosts.map(post => {

                    return <li key={post.id} className={styles.postItem}> <div className={styles.title}>
                        <Link href={`/blog/${post.id}`} className={styles.postLink}>
                            {post.title}
                        </Link></div>
                        <div className={styles.postMeta}>
                            <span className={styles.date}>
                                {new Date(post.created_at).toLocaleDateString('en-EN')}
                            </span>
                        </div>

                    </li>
                })}
            </ul>
        </div>
    )
}

export default LatestUserPosts